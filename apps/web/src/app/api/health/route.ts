/**
 * Liveness probe for the Next.js runtime. Used by the Docker HEALTHCHECK
 * directive in apps/web/Dockerfile. Intentionally dynamic so the response
 * is never cached.
 */

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok", service: "web" });
}
