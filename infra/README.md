# infra

Docker Compose, Caddy, and Hetzner deployment assets for HollerithEnergyML.

> **Status:** Skeleton directory. Files land in Phase 5.

## Planned contents

```
infra/
├── docker-compose.yml        Local development stack
├── docker-compose.prod.yml   Production stack (Hetzner)
├── Caddyfile                 Reverse proxy + automatic HTTPS
└── deploy/
    ├── provision.sh          One-time Hetzner VPS setup
    └── deploy.sh             Invoked by GitHub Actions for rolling deploys
```

## Target host

Hetzner Cloud CX22 (Nuremberg) · Ubuntu 24.04 LTS · Docker 27 · Docker
Compose plugin v2 · Caddy 2.

## Deployment flow

1. A push to `main` triggers `.github/workflows/deploy.yml`.
2. CI builds both Docker images and pushes them to
   `ghcr.io/lukasgro63/hollerithengeryml/{web,api}`.
3. CI SSHes into the Hetzner host and runs `deploy/deploy.sh`, which does
   `docker compose pull && docker compose up -d` and then smoke-tests the
   health endpoints.
4. On health-check failure, the previous image tag is rolled back.

See [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) for runtime topology
and [`../docs/RUNBOOK.md`](../docs/RUNBOOK.md) for operations.
