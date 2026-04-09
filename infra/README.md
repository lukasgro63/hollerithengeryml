# infra

Operational assets for HollerithEnergyML: local Docker Compose stack, the
production stack for the Hetzner CX22 host, the Caddy reverse proxy
configuration, and the provisioning + deploy scripts wired into GitHub Actions.

## Files

| File | Purpose |
| --- | --- |
| `docker-compose.yml` | Local development stack (web + api on a shared bridge network). |
| `docker-compose.prod.yml` | Production stack consumed on the Hetzner host (caddy + web + api, GHCR images). |
| `Caddyfile` | Reverse proxy, automatic HTTPS, security headers, request log. |
| `deploy/provision.sh` | One-time Hetzner VPS bootstrap (Docker, ufw, fail2ban, deploy user, env template, prune timer). |
| `deploy/deploy.sh` | CI-driven rolling deploy with health-gated rollback. |
| `README.md` | This file. |

## Local development

```bash
docker compose -f infra/docker-compose.yml up --build
```

The web container is reachable at `http://localhost:3000` and the api at
`http://localhost:8000`. Compose waits for the api healthcheck before starting
the web container.

## Production topology

```
internet
   |
   v
Caddy :443  (TLS termination, security headers, gzip/zstd)
   |
   +-- /api/*  -->  api  :8000  (FastAPI, read_only, tmpfs /tmp)
   |
   +-- /*      -->  web  :3000  (Next.js standalone)
```

All three services share the `hollerith` Docker network. Caddy is the only
container that publishes ports on the host (`80`, `443`).

## One-time Hetzner provisioning

1. Copy the provisioning script and your deploy SSH public key to the fresh VPS as root:

   ```bash
   scp infra/deploy/provision.sh root@<host>:/root/provision.sh
   scp ~/.ssh/hollerith_deploy.pub root@<host>:/root/hollerith_deploy.pub
   ```

2. SSH in as root:

   ```bash
   ssh root@<host>
   ```

3. Run the script (it refuses to run twice):

   ```bash
   chmod +x /root/provision.sh
   /root/provision.sh /root/hollerith_deploy.pub
   ```

4. Edit `/etc/hollerith/.env` to replace every `REPLACE_WITH_DOMAIN`
   placeholder, then configure the GitHub repository:

   - Secrets: `HETZNER_HOST`, `HETZNER_USER` (= `hollerith`), `HETZNER_SSH_KEY`
   - Variables: `SITE_DOMAIN`

## CI/CD flow

1. Every push (and every pull request to `main`) runs `.github/workflows/ci.yml`: ruff + pytest for the api, ESLint + `tsc --noEmit` + `next build` for the web.
2. A push to `main` triggers `.github/workflows/deploy.yml`, which reuses the CI workflow as a gate.
3. The `build-push` matrix builds both Docker images with Buildx and pushes them to `ghcr.io/lukasgro63/hollerithengeryml/{web,api}` tagged with both `latest` and the commit SHA.
4. The `deploy` job copies `Caddyfile`, `docker-compose.prod.yml`, and `deploy/deploy.sh` to `/opt/hollerith/` on the Hetzner host, runs `deploy.sh <sha>` over SSH, and finally smoke-tests `https://$SITE_DOMAIN/api/v1/health`.

## Manual deploy

To roll out a specific image tag (e.g. a previously built SHA) without going
through GitHub Actions, SSH to the host as the `hollerith` user and run:

```bash
sudo /opt/hollerith/deploy.sh 1a2b3c4d5e6f7890abcdef1234567890abcdef12
```

The script writes the new tag into `/etc/hollerith/.env`, performs
`docker compose pull && up -d --remove-orphans`, polls container health for up
to 60 seconds, and rolls back to the previous tag (recorded in
`/opt/hollerith/.state/previous_tag`) if either container reports unhealthy.
A timestamped audit trail is appended to `/var/log/hollerith-deploy.log`.

For incident response, troubleshooting, and full operational procedures see
[`../docs/RUNBOOK.md`](../docs/RUNBOOK.md).
