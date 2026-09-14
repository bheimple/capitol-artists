import type { NextConfig } from "next";
import { SITE_URL } from "./src/lib/site";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Keep Next, analytics, FormSubmit, and YouTube resource loading unrestricted.
          { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'" },
        ],
      },
      {
        source: "/:path*",
        // Protect the public site from framing while allowing local and Vercel previews.
        has: [{ type: "host", value: "(?:www\\.)?capitol-artists\\.com" }],
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.capitol-artists\\.com" }],
        destination: `${SITE_URL}/:path*`,
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default nextConfig;
