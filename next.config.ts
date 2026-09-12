import type { NextConfig } from "next";
import { SITE_URL } from "./src/lib/site";

const nextConfig: NextConfig = {
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
