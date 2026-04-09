#!/usr/bin/env bash
# CI-driven rolling deploy script for the Hetzner host.
#
# Invoked over SSH by .github/workflows/deploy.yml as:
#     sudo /opt/hollerith/deploy.sh <git-sha>
#
# Behaviour:
#   - records the previous TAG so an unhealthy deploy can be rolled back
#   - rewrites /etc/hollerith/.env atomically with the new TAG
#   - runs `docker compose pull` + `up -d --remove-orphans`
#   - polls container health for HEALTH_TIMEOUT_SECONDS, rolls back on failure
#   - appends a timestamped audit trail to LOG_FILE

set -euo pipefail

readonly APP_DIR="/opt/hollerith"
readonly STATE_DIR="${APP_DIR}/.state"
readonly PREVIOUS_TAG_FILE="${STATE_DIR}/previous_tag"
readonly COMPOSE_FILE="${APP_DIR}/docker-compose.prod.yml"
readonly ENV_FILE="/etc/hollerith/.env"
readonly LOG_FILE="/var/log/hollerith-deploy.log"
readonly HEALTH_TIMEOUT_SECONDS=60
readonly HEALTH_POLL_INTERVAL_SECONDS=3
readonly HEALTH_CONTAINERS=("hollerith-api" "hollerith-web")

ts() {
	date -u '+%Y-%m-%dT%H:%M:%SZ'
}

log() {
	local line
	line="$(ts) $*"
	printf '%s\n' "${line}" | tee -a "${LOG_FILE}"
}

die() {
	log "ERROR $*"
	exit 1
}

require_args() {
	if [[ $# -ne 1 || -z $1 ]]; then
		echo "usage: $0 <new_tag>" >&2
		exit 2
	fi
}

ensure_paths() {
	[[ -f ${COMPOSE_FILE} ]] || die "compose file missing: ${COMPOSE_FILE}"
	[[ -f ${ENV_FILE} ]] || die "env file missing: ${ENV_FILE}"
	mkdir -p "${STATE_DIR}"
	touch "${LOG_FILE}"
}

read_current_tag() {
	local current
	current="$(grep -E '^TAG=' "${ENV_FILE}" | tail -n1 | cut -d= -f2- || true)"
	if [[ -z ${current} ]]; then
		current="latest"
	fi
	printf '%s' "${current}"
}

write_tag_atomic() {
	local new_tag=$1
	local tmp="${ENV_FILE}.new"
	if grep -qE '^TAG=' "${ENV_FILE}"; then
		sed "s|^TAG=.*|TAG=${new_tag}|" "${ENV_FILE}" >"${tmp}"
	else
		cp "${ENV_FILE}" "${tmp}"
		printf 'TAG=%s\n' "${new_tag}" >>"${tmp}"
	fi
	chown --reference="${ENV_FILE}" "${tmp}"
	chmod --reference="${ENV_FILE}" "${tmp}"
	mv "${tmp}" "${ENV_FILE}"
}

compose() {
	docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" "$@"
}

pull_and_up() {
	log "compose pull"
	compose pull
	log "compose up -d --remove-orphans"
	compose up -d --remove-orphans
}

container_health() {
	local name=$1
	docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "${name}" 2>/dev/null || printf 'missing'
}

wait_for_health() {
	local elapsed=0
	while ((elapsed < HEALTH_TIMEOUT_SECONDS)); do
		local all_healthy=1
		for name in "${HEALTH_CONTAINERS[@]}"; do
			local status
			status="$(container_health "${name}")"
			if [[ ${status} != "healthy" ]]; then
				all_healthy=0
				log "health ${name}=${status} elapsed=${elapsed}s"
				break
			fi
		done
		if ((all_healthy == 1)); then
			log "all containers healthy after ${elapsed}s"
			return 0
		fi
		sleep "${HEALTH_POLL_INTERVAL_SECONDS}"
		elapsed=$((elapsed + HEALTH_POLL_INTERVAL_SECONDS))
	done
	return 1
}

rollback() {
	local previous_tag=$1
	log "ROLLBACK due to unhealthy deploy; restoring tag=${previous_tag}"
	write_tag_atomic "${previous_tag}"
	compose pull || log "WARN rollback pull failed for tag=${previous_tag}"
	compose up -d --remove-orphans || log "WARN rollback up failed for tag=${previous_tag}"
}

main() {
	require_args "$@"
	local new_tag=$1
	ensure_paths

	local previous_tag
	previous_tag="$(read_current_tag)"
	printf '%s\n' "${previous_tag}" >"${PREVIOUS_TAG_FILE}"
	log "deploy start new_tag=${new_tag} previous_tag=${previous_tag}"

	write_tag_atomic "${new_tag}"
	pull_and_up

	if wait_for_health; then
		log "deploy ok new_tag=${new_tag} previous_tag=${previous_tag}"
		printf 'deploy ok new_tag=%s previous_tag=%s\n' "${new_tag}" "${previous_tag}"
		exit 0
	fi

	rollback "${previous_tag}"
	exit 1
}

main "$@"
