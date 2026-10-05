import type { Metadata } from "next";
import { getDbPageContent } from "@/app/lib/getDbPageContent";
import { PageContentRenderer } from "@/app/components/PageContentRenderer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontrolór",
  description: "Dokumenty kontrolóra SZPH.",
};

export default async function KontrolorPage() {
  const dbPage = await getDbPageContent("o-szph/kontrolor");
  if (dbPage && dbPage.content.length > 0) {
    return <PageContentRenderer blocks={dbPage.content} breadcrumb="O SZPH" title={dbPage.title} />;
  }

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1100px] mx-auto">
          <Link href="/o-szph" className="inline-flex items-center gap-2 font-bold text-white hover:text-white transition-colors mb-6" style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}><svg className="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>Späť</Link>
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            O SZPH
          </span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Kontrolór
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-6 pt-12">
        <p className="text-[#334155] mb-6" style={{ fontSize: "15px", lineHeight: 1.8 }}>
          Aktuálne dokumenty nájdete na stránke:
        </p>
        <a
          href="https://sport.iedu.sk/Company/Company/10896"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-semibold text-white rounded-full px-6 py-3 transition-opacity hover:opacity-80"
          style={{ background: "#1d4ed8", fontSize: "14px" }}
        >
          sport.iedu.sk
        </a>
      </div>
    </article>
  );
}
