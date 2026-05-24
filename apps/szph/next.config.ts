import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@szph/ui", "@szph/db"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vcwgztguqqeaygcunynn.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@szph/ui", "lucide-react", "framer-motion"],
  },
};

export default nextConfig;
