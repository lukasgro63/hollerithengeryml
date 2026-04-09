#!/usr/bin/env bash
# One-time provisioning script for the HollerithEnergyML Hetzner host.
#
# Target: Ubuntu 24.04 LTS, run as root (or via sudo) on a fresh CX22 VPS.
#
# Usage:
#   sudo ./provision.sh /path/to/deploy_user_id_ed25519.pub
#
# Idempotency: a sentinel file at /etc/hollerith/.provisioned blocks reruns.
# Re-running is refused; redo a fresh VPS instead of patching state.

set -euo pipefail

readonly DEPLOY_USER="hollerith"
readonly APP_DIR="/opt/hollerith"
readonly ETC_DIR="/etc/hollerith"
readonly ENV_FILE="${ETC_DIR}/.env"
readonly SENTINEL="${ETC_DIR}/.provisioned"
readonly SYSTEMD_DIR="/etc/systemd/system"
readonly PRUNE_SERVICE="hollerith-prune.service"
readonly PRUNE_TIMER="hollerith-prune.timer"

log() {
	printf '[provision] %s\n' "$*"
}

require_root() {
	if [[ ${EUID} -ne 0 ]]; then
		echo "provision.sh must run as root (use sudo)" >&2
		exit 1
	fi
}

require_args() {
	if [[ $# -ne 1 ]]; then
		echo "usage: $0 <ssh_public_key_file>" >&2
		exit 2
	fi
	if [[ ! -r $1 ]]; then
		echo "ssh public key file not readable: $1" >&2
		exit 2
	fi
}

refuse_double_run() {
	if [[ -f ${SENTINEL} ]]; then
		echo "host already provisioned (${SENTINEL} exists); refusing to rerun" >&2
		exit 3
	fi
}

apt_bootstrap() {
	log "updating apt and upgrading base system"
	export DEBIAN_FRONTEND=noninteractive
	apt-get update
	apt-get upgrade -y
	apt-get install -y \
		ca-certificates \
		curl \
		gnupg \
		lsb-release \
		ufw \
		fail2ban \
		unattended-upgrades \
		apt-listchanges
}

install_docker() {
	if command -v docker >/dev/null 2>&1; then
		log "docker already installed; skipping"
		return
	fi
	log "installing Docker CE via official convenience script"
	curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
	sh /tmp/get-docker.sh
	rm -f /tmp/get-docker.sh
	# get.docker.com installs docker-ce + containerd + the compose plugin.
	systemctl enable --now docker
}

create_deploy_user() {
	if id "${DEPLOY_USER}" >/dev/null 2>&1; then
		log "user ${DEPLOY_USER} already exists"
	else
		log "creating user ${DEPLOY_USER}"
		useradd --create-home --shell /bin/bash "${DEPLOY_USER}"
	fi
	usermod -aG docker "${DEPLOY_USER}"

	local ssh_dir="/home/${DEPLOY_USER}/.ssh"
	install -d -m 700 -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "${ssh_dir}"
	install -m 600 -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "$1" "${ssh_dir}/authorized_keys"
}

configure_firewall() {
	log "configuring ufw"
	ufw --force reset
	ufw default deny incoming
	ufw default allow outgoing
	ufw allow 22/tcp
	ufw allow 80/tcp
	ufw allow 443/tcp
	ufw --force enable
}

prepare_app_dirs() {
	log "creating ${APP_DIR} and ${ETC_DIR}"
	install -d -m 750 -o "${DEPLOY_USER}" -g "${DEPLOY_USER}" "${APP_DIR}"
	install -d -m 750 -o root -g "${DEPLOY_USER}" "${ETC_DIR}"

	if [[ -f ${ENV_FILE} ]]; then
		log "${ENV_FILE} already exists; leaving untouched"
		return
	fi

	log "writing ${ENV_FILE} template"
	umask 027
	cat >"${ENV_FILE}" <<'ENV_EOF'
ENVIRONMENT=production
LOG_LEVEL=info
ALLOWED_ORIGINS=https://REPLACE_WITH_DOMAIN
PREDICTIONS_RATE_LIMIT_PER_MINUTE=30
NEXT_PUBLIC_API_URL=https://REPLACE_WITH_DOMAIN
NEXT_PUBLIC_SITE_URL=https://REPLACE_WITH_DOMAIN
SITE_DOMAIN=REPLACE_WITH_DOMAIN
TAG=latest
ENV_EOF
	chown root:"${DEPLOY_USER}" "${ENV_FILE}"
	chmod 640 "${ENV_FILE}"
}

configure_unattended_upgrades() {
	log "configuring unattended-upgrades for security updates only"
	cat >/etc/apt/apt.conf.d/20auto-upgrades <<'AUTO_EOF'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Download-Upgradeable-Packages "1";
AUTO_EOF

	cat >/etc/apt/apt.conf.d/50unattended-upgrades <<'UNATT_EOF'
Unattended-Upgrade::Allowed-Origins {
        "${distro_id}:${distro_codename}-security";
        "${distro_id}ESMApps:${distro_codename}-apps-security";
        "${distro_id}ESM:${distro_codename}-infra-security";
};
Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
Unattended-Upgrade::Automatic-Reboot "false";
UNATT_EOF

	systemctl enable --now unattended-upgrades.service
}

configure_fail2ban() {
	log "enabling fail2ban for sshd"
	cat >/etc/fail2ban/jail.d/sshd.local <<'F2B_EOF'
[sshd]
enabled = true
port    = ssh
backend = systemd
maxretry = 5
findtime = 10m
bantime  = 1h
F2B_EOF
	systemctl enable --now fail2ban
}

install_prune_timer() {
	log "installing weekly docker prune timer"
	cat >"${SYSTEMD_DIR}/${PRUNE_SERVICE}" <<'SVC_EOF'
[Unit]
Description=Prune unused Docker images, containers, and networks for HollerithEnergyML
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
ExecStart=/usr/bin/docker system prune -af
SVC_EOF

	cat >"${SYSTEMD_DIR}/${PRUNE_TIMER}" <<'TIMER_EOF'
[Unit]
Description=Weekly Docker prune for HollerithEnergyML

[Timer]
OnCalendar=Sun 04:00
Persistent=true
Unit=hollerith-prune.service

[Install]
WantedBy=timers.target
TIMER_EOF

	systemctl daemon-reload
	systemctl enable --now "${PRUNE_TIMER}"
}

mark_provisioned() {
	touch "${SENTINEL}"
	chmod 600 "${SENTINEL}"
}

print_next_steps() {
	cat <<'NEXT_EOF'

================================================================================
Provisioning complete.

Next steps:
  1. Edit /etc/hollerith/.env on this host and replace every REPLACE_WITH_DOMAIN
     placeholder with the real production domain (without the protocol for
     SITE_DOMAIN, with https:// for ALLOWED_ORIGINS / NEXT_PUBLIC_*).
  2. From your workstation, copy the deployment files into /opt/hollerith/:
         scp infra/docker-compose.prod.yml hollerith@<host>:/opt/hollerith/
         scp infra/Caddyfile               hollerith@<host>:/opt/hollerith/
         scp infra/deploy/deploy.sh        hollerith@<host>:/opt/hollerith/
         ssh hollerith@<host> chmod +x /opt/hollerith/deploy.sh
  3. Log out of the root session and SSH back in as the hollerith user
     (the docker group membership only takes effect on a new login).
  4. Pull and start the stack for the first time:
         docker compose -f /opt/hollerith/docker-compose.prod.yml --env-file /etc/hollerith/.env pull
         docker compose -f /opt/hollerith/docker-compose.prod.yml --env-file /etc/hollerith/.env up -d
================================================================================
NEXT_EOF
}

main() {
	require_root
	require_args "$@"
	refuse_double_run

	apt_bootstrap
	install_docker
	create_deploy_user "$1"
	configure_firewall
	prepare_app_dirs
	configure_unattended_upgrades
	configure_fail2ban
	install_prune_timer
	mark_provisioned
	print_next_steps
}

main "$@"
