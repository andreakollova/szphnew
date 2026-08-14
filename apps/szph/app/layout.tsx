import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { inter } from "@szph/ui/fonts";
import { NavbarSzph, Footer } from "@szph/ui";
import "./globals.css";

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
      <body>
        <NavbarSzph announcement={announcement} />
        {/* 80px navbar + 36px announcement bar = 116px */}
        <main className="pt-[96px] md:pt-[116px]">{children}</main>
        <Footer brand="szph" />
      </body>
    </html>
  );
}
