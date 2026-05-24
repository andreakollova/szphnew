import type { Metadata } from "next";
import { inter } from "@szph/ui/fonts";
import { Navbar, Footer } from "@szph/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SZPH — Slovenský zväz pozemného hokeja",
    template: "%s | SZPH",
  },
  description:
    "Slovenský zväz pozemného hokeja — oficiálna stránka. Novinky, zápasy, dokumenty a informácie pre kluby.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://szph.sk"
  ),
  openGraph: {
    siteName: "szph.sk",
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
    <html lang="sk" data-brand="szph" className={inter.variable}>
      <body>
        <Navbar
          brand="szph"
          crossSiteUrl="https://fieldhockey.sk"
          crossSiteLabel="fieldhockey.sk"
        />
        <main>{children}</main>
        <Footer brand="szph" />
      </body>
    </html>
  );
}
