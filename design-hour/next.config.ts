import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/ads/direction',
        destination: '/check',
        permanent: true,
      },
      {
        source: '/m',
        destination: '/check?utm_source=meta&utm_campaign=mistakes',
        permanent: false,
      }
    ];
  }
};

export default nextConfig;
