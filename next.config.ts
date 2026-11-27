import type { NextConfig } from "next";

const config: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [{ source: "/", destination: "/ky", permanent: false }];
  },
};

export default config;
