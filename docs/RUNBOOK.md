# Runbook

Operational playbook for deploying, observing, and recovering the
HollerithEnergyML production stack on a Hetzner Cloud VPS.

## First-time production setup

1. **Prerequisites.** A Hetzner Cloud account, an SSH keypair (`~/.ssh/id_rsa`
   and `~/.ssh/id_rsa.pub`), and a registered domain name with an `A` record
   pointing at the VPS public IPv4 address.
2. **Provision the VPS.** Create a fresh **Hetzner Cloud CX22** in the
   Nuremberg location, image **Ubuntu 24.04 LTS**, with your SSH key installed
   for the `root` user.
3. **Copy the bootstrap script and your public key to the host:**
   ```bash
   scp infra/deploy/provision.sh ~/.ssh/id_rsa.pub root@<host>:/tmp/
   ```
4. **Run the bootstrap as root.** This installs Docker, configures `ufw` and
   `fail2ban`, creates the unprivileged `hollerith` user, scaffolds
   `/etc/hollerith/.env` from the template, and installs the weekly
   `docker system prune` timer:
   ```bash
   ssh root@<host> "bash /tmp/provision.sh /tmp/id_rsa.pub"
   ```
5. **Fill in the real secrets** in `/etc/hollerith/.env` on the host. Replace
   every `REPLACE_WITH_DOMAIN` placeholder with the production domain and
   confirm `TAG=latest` (or pin a specific image tag if you prefer).
   ```bash
   ssh root@<host> "vim /etc/hollerith/.env"
   ```
6. **Copy the compose files and the deploy script to the host:**
   ```bash
   scp infra/docker-compose.prod.yml infra/Caddyfile infra/deploy/deploy.sh \
       hollerith@<host>:/opt/hollerith/
   ```
7. **First manual deploy** — pull the images from `ghcr.io` and start the
   stack. Caddy will request a Let's Encrypt certificate on first boot:
   ```bash
   ssh hollerith@<host> "cd /opt/hollerith && \
       docker compose -f docker-compose.prod.yml pull && \
       docker compose -f docker-compose.prod.yml up -d"
   ```
8. **Configure the GitHub repository for CI-driven deploys.** In the
   `lukasgro63/hollerithengeryml` repository settings, add the secrets
   `HETZNER_HOST`, `HETZNER_USER`, and `HETZNER_SSH_KEY` (the private key for
   the `hollerith` user), and add the repository variable `SITE_DOMAIN` set to
   the production domain.
9. **Push to `main`.** From this point on, `.github/workflows/deploy.yml`
   takes over: it runs CI, builds and pushes the `web` and `api` images to
   `ghcr.io`, and triggers `deploy.sh` on the host.

## Deploy a new version

Normal flow: merge to `main`. The `deploy.yml` workflow runs CI, builds the
images, pushes them to `ghcr.io`, copies the latest compose files to the
host, and runs `deploy.sh` with the new git SHA.

Manual fallback (e.g. CI is offline):
```bash
ssh hollerith@<host> "sudo /opt/hollerith/deploy.sh <git-sha>"
```

## Roll back to a previous version

`deploy.sh` records the previous tag in `/opt/hollerith/.state/previous_tag`
on every successful deploy. Manual rollback:
```bash
ssh hollerith@<host> "sudo /opt/hollerith/deploy.sh \
    \$(cat /opt/hollerith/.state/previous_tag)"
```

Rollback is **automatic** when a deploy fails its post-up healthcheck poll —
`deploy.sh` re-pulls the previous tag, restarts the stack, and exits non-zero
so the GitHub Actions run is marked as failed.

## Read logs

```bash
docker compose -f /opt/hollerith/docker-compose.prod.yml logs -f api
docker compose -f /opt/hollerith/docker-compose.prod.yml logs -f web
docker compose -f /opt/hollerith/docker-compose.prod.yml logs -f caddy
sudo tail -f /var/log/hollerith-deploy.log
```

The first three are the live container logs. The fourth is the append-only
deploy history that `deploy.sh` writes on every invocation.

## Restart a service without full downtime

```bash
ssh hollerith@<host> "cd /opt/hollerith && \
    docker compose -f docker-compose.prod.yml restart api"
```

Caddy keeps serving the cached web front-end while `api` recycles, so users
see at most a brief 5xx window on requests in flight when the api container
goes down. The same command works for `web` and `caddy`.

## TLS certificate rotation

Caddy renews Let's Encrypt certificates automatically, 30 days before
expiry. No manual action is needed in the steady state.

Verify the current certificate inventory:
```bash
docker exec hollerith-caddy-1 caddy list-certificates
```
(Adjust the container name if `docker compose ps` shows a different value.)

If renewal fails, work through this checklist:

1. Confirm the domain's `A` record still points at the VPS IPv4.
2. Confirm ports `80` and `443` reach Caddy from the public internet (`ufw
   status`, Hetzner Cloud firewall rules).
3. Inspect the ACME challenge errors in the proxy logs:
   ```bash
   docker compose -f /opt/hollerith/docker-compose.prod.yml logs caddy
   ```
4. Check `/data/caddy/locks` inside the Caddy container — a stale lock will
   block new ACME orders.

## Handle a 5xx incident

Decision tree, top to bottom:

1. **Probe the api directly.**
   ```bash
   curl https://<domain>/api/v1/health
   ```
   If this 5xxs, the api container is unhealthy. Check
   `docker compose logs api` for a `loading_model_artefact` error or a
   Pydantic validation traceback during startup.
2. **Api loads but POST `/api/v1/predictions` times out or 429s.** Check
   the slowapi rate limit (default 30 requests per minute per IP, set via
   `PREDICTIONS_RATE_LIMIT_PER_MINUTE`). Check host CPU and memory with
   `top` or `htop`.
3. **`curl https://<domain>/api/health` (the Next.js healthcheck) fails but
   `/api/v1/health` works.** The web container is unhealthy. Check
   `docker compose logs web`.
4. **Both endpoints time out.** Caddy is not reaching the upstreams, or
   Caddy itself is down. Check:
   ```bash
   systemctl status docker
   sudo ufw status
   docker compose -f /opt/hollerith/docker-compose.prod.yml ps
   ```
   Confirm Caddy is bound on `:443`.
5. **Disk full.** Run `df -h`. The weekly `docker system prune` timer should
   prevent runaway image accumulation, but verify the timer is active with
   `systemctl list-timers` and inspect `/var/log` and `/var/lib/docker`.

## Update dependencies

Automated dependency updates are disabled. The reason: the deployed
meta-model was serialised with exactly `scikit-learn==1.2.2`,
`numpy==1.23.5`, `pandas==1.5.3`, and `joblib==1.3.2`; bumping any of
those versions will either break model loading or silently change
prediction output. The other dependencies ride along under the same
policy to keep the snapshot reproducible.

If you retrain the meta-model or export it to a version-agnostic
format (ONNX), re-enable updates by committing a `.github/dependabot.yml`
and re-running the rebuild pipeline.

## Restore from backup

Hetzner Cloud takes automatic daily snapshots. To restore:

1. Open the Hetzner Cloud console, select the server, click **Snapshots**,
   pick the snapshot, and click **Restore**. This **overwrites** the VPS
   disk.
2. After restore, re-verify `/etc/hollerith/.env` is intact and contains the
   right secrets.
3. Bring the stack back up:
   ```bash
   ssh hollerith@<host> "cd /opt/hollerith && \
       docker compose -f docker-compose.prod.yml up -d"
   ```

## Rotate secrets

Edit `/etc/hollerith/.env` in place on the host (as root or via `sudo`),
then restart the stack:
```bash
ssh root@<host> "vim /etc/hollerith/.env"
ssh hollerith@<host> "cd /opt/hollerith && \
    docker compose -f docker-compose.prod.yml up -d"
```
Docker Compose recreates any container whose `env_file` content has
changed, so the new secrets take effect on the next request.

## Monitor health

Hook up an external uptime monitor — Uptime Robot, Better Uptime, Hetzner's
own monitoring, etc. — against:
```
https://<domain>/api/v1/health
```
The JSON response body includes `model_loaded: true|false` so you can alert
on the meta-model being unavailable, not just on TCP reachability.

For drift detection, `GET /api/v1/metadata` returns the loaded scikit-learn
version, the trained-at date, and the input feature names. Diff this
periodically against your expected baseline to catch unintended image
rebuilds.
