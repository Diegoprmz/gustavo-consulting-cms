import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite servir el dev server a través del túnel de Cloudflare (URL aleatoria en
  // cada reinicio) para poder compartir el localhost con el cliente sin desplegar.
  allowedDevOrigins: ['*.trycloudflare.com'],
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/**' },
    ],
  },
};

export default nextConfig;
