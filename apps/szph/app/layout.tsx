import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { inter } from "@szph/ui/fonts";
import { NavbarSzph, Footer } from "@szph/ui";
import { CookieBanner } from "./components/CookieBanner";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { ScrollToTop } from "./components/ScrollToTop";
import { AppOnboarding } from "./components/AppOnboarding";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#0e264a",
};

export const metadata: Metadata = {
  title: {
    default: "SZPH — Slovenský zväz pozemného hokeja",
    template: "%s | SZPH",
  },
  description:
    "Slovenský zväz pozemného hokeja — oficiálna stránka. Novinky, zápasy, dokumenty a informácie pre kluby.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : "https://szph.sk"
  ),
  openGraph: {
    siteName: "szph.sk",
    locale: "sk_SK",
    type: "website",
  },
};

const getAnnouncement = unstable_cache(
  async () => {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase
        .from("articles")
        .select("title, slug")
        .eq("site", "szph")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        return { text: data[0].title, href: `/novinky/${data[0].slug}` };
      }
    } catch {
      // ignore
    }
    return null;
  },
  ["announcement"],
  { revalidate: 300 }
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const announcement = await getAnnouncement();

  return (
    <html lang="sk" data-brand="szph" className={inter.variable}>
      <head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />
        <script dangerouslySetInnerHTML={{ __html: `function googleTranslateElementInit(){new google.translate.TranslateElement({pageLanguage:'sk',includedLanguages:'en,sk',layout:google.translate.TranslateElement.InlineLayout.SIMPLE,autoDisplay:false},'google_translate_element')}` }} />
        <style dangerouslySetInnerHTML={{ __html: `.goog-te-banner-frame{display:none!important}.skiptranslate{display:none!important}body{top:0!important}#google_translate_element{display:none}` }} />
      </head>
      <body>
        <ScrollToTop />
        <NavbarSzph announcement={announcement} />
        {/* 80px navbar + 36px announcement bar = 116px */}
        <main className="mobile-header-offset pb-0">{children}</main>
        <Footer brand="szph" />
        <MobileBottomNav />
        <div id="google_translate_element" style={{ display: "none" }} />
        <CookieBanner />
        <AppOnboarding />
      </body>
    </html>
  );
}
