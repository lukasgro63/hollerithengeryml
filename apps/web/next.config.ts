import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a standalone server bundle so the Docker runtime image only needs
  // the compiled output plus node, not the full node_modules tree.
  output: "standalone",

  // Remove the `x-powered-by: Next.js` response header — no reason to leak
  // framework/version information to the public.
  poweredByHeader: false,

  reactStrictMode: true,
};

export default nextConfig;
