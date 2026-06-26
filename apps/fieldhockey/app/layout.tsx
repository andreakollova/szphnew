import type { Metadata } from "next";
import { inter } from "@szph/ui/fonts";
import { Navbar, Footer } from "@szph/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "fieldhockey.sk — Pozemný hokej je viac ako šport",
    template: "%s | fieldhockey.sk",
  },
  description:
    "Slovenský pozemný hokej — novinky, zápasy, video a komunita. Pozemný hokej je viac ako šport.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://fieldhockey.sk"
  ),
  openGraph: {
    siteName: "fieldhockey.sk",
    locale: "sk_SK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" data-brand="fieldhockey" className={inter.variable}>
      <body>
        <Navbar
          brand="fieldhockey"
          crossSiteUrl="https://szph.sk"
          crossSiteLabel="szph.sk"
        />
        {/* 98px = blue bar(34) + white nav(64) */}
        <main className="pt-[64px] md:pt-[98px]">{children}</main>
        <Footer brand="fieldhockey" />
      </body>
    </html>
  );
}
