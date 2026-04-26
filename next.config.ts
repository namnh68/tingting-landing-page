import type { NextConfig } from "next";

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) =>
    m.initOpenNextCloudflareForDev()
  );
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;