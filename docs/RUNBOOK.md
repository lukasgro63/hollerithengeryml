# Runbook

Operational playbook for the HollerithEnergyML production stack on Hetzner
Cloud. The deployment flow is **Portainer GitOps**: GitHub Actions builds
images and triggers a Portainer webhook; Portainer reconciles the stack
from the Git repository.

## Production topology

- **Host**: Hetzner Cloud VPS, Ubuntu 24.04 LTS, public IPv4 `46.224.134.32`.
- **Reverse proxy**: Caddy 2, port `80` only (no domain, no HTTPS yet).
- **Stack management**: Portainer CE on port `9443`.
- **Registry**: `ghcr.io/lukasgro63/hollerithengeryml/{web,api}:latest`.

```
internet
   |
   v
:80  Caddy  (security headers, gzip/zstd)
   |
   +-- /api/*  -->  hollerith-api  :8000
   |
   +-- /*      -->  hollerith-web  :3000
```

All three containers live in the `hollerith` Docker network on the host.
Only Caddy binds a host port.

## Deploy a new version

Normal flow: push to `main`.

```
git push origin main
```

GitHub Actions runs:

1. **CI** — ruff, pytest, tsc, next build.
2. **build-push** — builds both Docker images and pushes them to `ghcr.io`
   tagged with `latest` and the commit SHA.
3. **deploy** — triggers the Portainer webhook, waits 45 seconds, runs a
   smoke test against `http://46.224.134.32/api/v1/health`.

Portainer re-pulls the compose file from the repository, pulls the new
images from `ghcr.io`, and recreates any container whose image digest
changed. Total end-to-end time: about three minutes.

## Roll back to a previous version

Portainer does not keep an automatic tag history. Roll back by pointing
the stack at a previous commit SHA:

1. Find the SHA on the [Actions](https://github.com/lukasgro63/hollerithengeryml/actions)
   page — every successful `build-push` job tags the images with that SHA.
2. In Portainer → **Stacks → hollerith → Editor**, change the two image
   references from `:latest` to `:<sha>`.
3. Click **Update the stack**.

Alternatively, revert the offending commit on `main` and let the normal
deploy pipeline bring the service back to the previous state.

## Read logs

In Portainer → **Containers → hollerith-{api,web,caddy} → Logs**.

Or via SSH on the host:

```
docker logs -f hollerith-api
docker logs -f hollerith-web
docker logs -f hollerith-caddy
```

## Restart a service

In Portainer → **Containers → hollerith-{api,web,caddy} → Restart**.

Or via SSH:

```
docker restart hollerith-api
```

## Handle a 5xx incident

Decision tree, top to bottom:

1. **Probe the api directly.**

   ```
   curl http://46.224.134.32/api/v1/health
   ```

   If this 5xxs, the api container is unhealthy. Check `docker logs
   hollerith-api` for a `loading_model_artefact` error or a Pydantic
   validation traceback during startup.

2. **Api responds but POST `/api/v1/predictions` hits a 429.** The slowapi
   rate limiter is firing (default 30 requests per minute per IP, set via
   `PREDICTIONS_RATE_LIMIT_PER_MINUTE`). Either wait, bump the limit, or
   identify the hot client.

3. **Web container unhealthy but api works.** Check `docker logs
   hollerith-web`.

4. **Both endpoints time out.** Caddy is not reaching the upstreams, or
   Caddy itself is down.

   ```
   systemctl status docker
   docker ps | grep hollerith
   ```

5. **Disk full.** Run `df -h`. Prune manually if needed:

   ```
   docker system prune -af
   ```

## Update dependencies

Automated dependency updates are disabled. The reason: the deployed
meta-model was serialised with exactly `scikit-learn==1.2.2`,
`numpy==1.23.5`, `pandas==1.5.3`, and `joblib==1.3.2`; bumping any of
those versions will either break model loading or silently change
prediction output.

If you retrain the meta-model or export it to a version-agnostic format
(ONNX), re-enable updates by committing a `.github/dependabot.yml`.

## Rotate the Portainer registry token

Portainer holds a GitHub Personal Access Token so it can pull from the
private GHCR namespace. Rotate it in Portainer → **Settings → Registries
→ ghcr-hollerith → Edit**.

## Rotate the GitHub Actions deploy webhook

1. In Portainer → **Stacks → hollerith → GitOps updates → Regenerate
   webhook**.
2. Copy the new URL.
3. In GitHub → **Settings → Secrets and variables → Actions → Secrets →
   `PORTAINER_WEBHOOK_URL` → Update**.

## Monitor health

For uptime monitoring, point any external probe (Uptime Robot, Better
Uptime, Hetzner's own tooling) at:

```
http://46.224.134.32/api/v1/health
```

The JSON response body includes `model_loaded: true|false` so you can
alert on the meta-model being unavailable, not just on TCP reachability.

For drift detection, `GET /api/v1/metadata` returns the loaded
scikit-learn version, the trained-at date, and the input feature names.
Diff this periodically against your expected baseline to catch
unintended image rebuilds.
