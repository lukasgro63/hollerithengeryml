# Runbook

> **Status:** Placeholder. To be filled during Phase 5 (deployment) and
> finalised in Phase 6 (handoff).

Sections planned:

- Deploy a new version
- Roll back to a previous version
- Read logs (`docker compose logs -f`, journald)
- Restart a service (`docker compose restart api`)
- TLS certificate rotation (Caddy handles this automatically)
- Handle a 5xx incident
- Update dependencies
- Restore from a Hetzner snapshot
- Rotate secrets in `/etc/hollerith/.env`
