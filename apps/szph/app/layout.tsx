import type { Metadata } from "next";
import { cookies } from "next/headers";
import { inter } from "@szph/ui/fonts";
import { NavbarSzph, Footer } from "@szph/ui";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPublishedArticles } from "@szph/db";
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

async function getAnnouncement() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerSupabaseClient(cookieStore);
    const articles = await getPublishedArticles(supabase, { site: "szph", limit: 1 });
    if (articles.length > 0) {
      return { text: articles[0].title, href: `/novinky/${articles[0].slug}` };
    }
  } catch {
    // ignore
  }
  return null;
}

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
