import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/pl", permanent: false }];
  },
};

export default nextConfig;
