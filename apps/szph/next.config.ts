import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@szph/ui", "@szph/db"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "vcwgztguqqeaygcunynn.supabase.co", pathname: "/storage/v1/object/public/**" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "flagcdn.com" },
      // Hockey news image sources
      { protocol: "https", hostname: "media.static-hw.nl" },
      { protocol: "https", hostname: "cdn.static-hw.nl" },
      { protocol: "https", hostname: "static.wixstatic.com" },
      { protocol: "https", hostname: "admin.eurohockey.org" },
      { protocol: "https", hostname: "eshockey.es" },
      { protocol: "https", hostname: "**.hockey.nl" },
      { protocol: "https", hostname: "**.hockey.ie" },
      { protocol: "https", hostname: "**.scottish-hockey.org.uk" },
      { protocol: "https", hostname: "**.hockey.org.au" },
      { protocol: "https", hostname: "**.cahockey.org.ar" },
      { protocol: "https", hostname: "**.hockeyindia.org" },
      { protocol: "https", hostname: "**.hockey.de" },
      { protocol: "https", hostname: "**.hockey.be" },
      { protocol: "https", hostname: "**.eurohockey.org" },
      { protocol: "https", hostname: "**.fih.hockey" },
      { protocol: "https", hostname: "**.greatbritainhockey.co.uk" },
      { protocol: "https", hostname: "**.englandhockey.co.uk" },
      { protocol: "https", hostname: "**.hockeywales.org.uk" },
      { protocol: "https", hostname: "**.fieldhockey.ca" },
      { protocol: "https", hostname: "**.hockeynz.co.nz" },
      { protocol: "https", hostname: "**.hockey.com.uy" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "**.wp.com" },
      { protocol: "https", hostname: "**.wordpress.com" },
      { protocol: "https", hostname: "**.imgix.net" },
      { protocol: "https", hostname: "pozemak.sk" },
    ],
  },
  experimental: {
    optimizePackageImports: ["@szph/ui", "lucide-react", "framer-motion"],
  },
};

export default nextConfig;
