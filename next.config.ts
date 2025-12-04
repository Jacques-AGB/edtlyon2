import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/planning",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
