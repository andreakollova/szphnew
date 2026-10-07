import { unstable_cache } from "next/cache";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novinky zo sveta",
  description: "Najnovšie správy zo sveta pozemného hokeja.",
};

const getWorldNews = unstable_cache(
  async () => {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const hr = createClient(
        "https://oivzvihdhidpbrjpygfl.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pdnp2aWhkaGlkcGJyanB5Z2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MzI3MTgsImV4cCI6MjA5MDIwODcxOH0.7d917agBywM3D1RlFJ27oHTRvjBaE_pyDxCzLKaKaIE"
      );
      const { data } = await hr
        .from("articles")
        .select("id, title_sk, image_url, url, scraped_at, source")
        .eq("published", true)
        .order("scraped_at", { ascending: false })
        .limit(30);
      return (data ?? [])
        .filter((a: any) => a.image_url && a.image_url.startsWith("https://"))
        .map((a: any) => ({
          id: String(a.id),
          title: a.title_sk ?? "",
          cover_image_url: a.image_url,
          published_at: a.scraped_at,
          url: a.url ?? null,
          source: a.source ?? null,
        }));
    } catch {
      return [];
    }
  },
  ["world-news-all"],
  { revalidate: 300 }
);

const SOURCE_FLAGS: Record<string, string> = {
  "Hockey Netherlands": "nl", "Hockey Germany": "de", "Hockey Belgium": "be",
  "Hockey Australia": "au", "Hockey Spain": "es", "Argentina Hockey": "ar",
  "Ireland Hockey": "ie", "Scottish Hockey": "gb-sct", "EuroHockey": "eu",
  "FIH Hockey": "eu", "England Hockey": "gb-eng", "Hockey Wales": "gb-wls",
  "GB Hockey": "gb", "Uruguay Hockey": "uy", "Hockey New Zealand": "nz",
  "Field Hockey Canada": "ca", "Hockey India": "in",
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });
}

export default async function SvetNovinkyPage() {
  const articles = await getWorldNews();

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1920px] mx-auto pt-8 pb-20">
        <div className="mb-8">
          <h1
            className="font-garet font-bold italic text-[#051937]"
            style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}
          >
            Novinky zo sveta
          </h1>
        </div>
        {articles.length === 0 ? (
          <div className="py-20 text-center text-[#64748b]">Žiadne novinky zo sveta</div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article: any) => {
              const flagCode = article.source ? SOURCE_FLAGS[article.source] : null;
              return (
                <a
                  key={article.id}
                  href={`/novinky/svet/${article.id}`}
                  className="group block overflow-hidden bg-white"
                  style={{ borderRadius: "10px", border: "1px solid rgba(1,45,116,0.06)" }}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ height: "200px" }}
                  >
                    {article.cover_image_url ? (
                      <Image
                        src={article.cover_image_url}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e2e8f0]" />
                    )}
                  </div>
                  <div className="px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="inline-block font-extrabold uppercase text-[#0078fe]"
                        style={{ fontSize: "9px", letterSpacing: "0.1em" }}
                      >
                        / svet
                      </span>
                      {flagCode && <img src={`https://flagcdn.com/w40/${flagCode}.png`} alt="" width={16} height={12} style={{ width: 16, height: 12, objectFit: "cover", borderRadius: 2 }} />}
                      {article.source && (
                        <span
                          className="inline-block font-bold uppercase text-[#94a3b8]"
                          style={{ fontSize: "8px", letterSpacing: "0.08em" }}
                        >
                          {article.source}
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-bold text-[#051937] leading-snug group-hover:text-[#012d74] transition-colors line-clamp-3"
                      style={{ fontSize: "15px" }}
                    >
                      {article.title}
                    </h3>
                    {article.published_at && (
                      <p
                        className="text-[#94a3b8] mt-1.5 font-bold uppercase"
                        style={{ fontSize: "9px", letterSpacing: "0.08em" }}
                      >
                        {formatDate(article.published_at)}
                      </p>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
