"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const PRODUCTS: Record<string, {
  id: string; name: string; price: number; category: string;
  images: string[]; description: string; details: string[];
  badge?: string; colors?: { name: string; hex: string; id: string }[];
}> = {
  "mikina-biela-logo": {
    id: "mikina-biela-logo", name: "Mikina SZPH biela — logo v predu", price: 44.90, category: "Mikiny", badge: "Novinka",
    images: ["/images/eshop/mikina-biela-1.png", "/images/eshop/mikina-biela-2.png"],
    description: "Oficiálna mikina SZPH v bielej farbe s veľkým logom hokejky so slovenským znakom na hrudi. Na chrbte nápis Slovakia Field Hockey. Kapucňa s tmavomodrými šnúrkami a klokaním vreckom.",
    details: ["Materiál: 80% bavlna, 20% polyester", "Kapucňa s tmavomodrými šnúrkami", "Predné klokaní vrecko", "Veľké logo SZPH na hrudi", "Nápis Slovakia Field Hockey na chrbte", "Dostupné veľkosti: XS — XXL"],
    colors: [{ name: "Biela", hex: "#f5f5f5", id: "mikina-biela-logo" }, { name: "Tmavomodrá", hex: "#051937", id: "mikina-modra-logo" }],
  },
  "mikina-biela-rukav": {
    id: "mikina-biela-rukav", name: "Mikina SZPH biela — logo na rukáve", price: 44.90, category: "Mikiny", badge: "Novinka",
    images: ["/images/eshop/mikina-biela-3.png", "/images/eshop/mikina-biela-4.png"],
    description: "Biela mikina SZPH s malým logom na hrudi a výrazným nápisom HOCKEY na rukáve. Minimalistický dizajn pre fanúšikov pozemného hokeja.",
    details: ["Materiál: 80% bavlna, 20% polyester", "Kapucňa s tmavomodrými šnúrkami", "Predné klokaní vrecko", "Malé logo SZPH na hrudi", "Nápis HOCKEY na rukáve", "Dostupné veľkosti: XS — XXL"],
    colors: [{ name: "Biela", hex: "#f5f5f5", id: "mikina-biela-rukav" }, { name: "Tmavomodrá", hex: "#051937", id: "mikina-modra-rukav" }],
  },
  "mikina-modra-logo": {
    id: "mikina-modra-logo", name: "Mikina SZPH tmavomodrá — logo v predu", price: 44.90, category: "Mikiny", badge: "Novinka",
    images: ["/images/eshop/mikina-modra-1.png", "/images/eshop/mikina-modra-2.png"],
    description: "Tmavomodrá mikina SZPH s bielym logom hokejky so slovenským znakom na hrudi. Na chrbte nápis Slovakia Field Hockey. Klasický strih s kapucňou a klokaním vreckom.",
    details: ["Materiál: 80% bavlna, 20% polyester", "Kapucňa so šnúrkami", "Predné klokaní vrecko", "Biele logo SZPH na hrudi", "Nápis Slovakia Field Hockey na chrbte", "Dostupné veľkosti: XS — XXL"],
    colors: [{ name: "Biela", hex: "#f5f5f5", id: "mikina-biela-logo" }, { name: "Tmavomodrá", hex: "#051937", id: "mikina-modra-logo" }],
  },
  "mikina-modra-rukav": {
    id: "mikina-modra-rukav", name: "Mikina SZPH tmavomodrá — logo na rukáve", price: 44.90, category: "Mikiny", badge: "Novinka",
    images: ["/images/eshop/mikina-modra-3.png", "/images/eshop/mikina-modra-4.png"],
    description: "Tmavomodrá mikina SZPH s malým bielym logom na hrudi a nápisom HOCKEY na rukáve. Športový minimalistický dizajn.",
    details: ["Materiál: 80% bavlna, 20% polyester", "Kapucňa so šnúrkami", "Predné klokaní vrecko", "Malé biele logo SZPH na hrudi", "Nápis HOCKEY na rukáve", "Dostupné veľkosti: XS — XXL"],
    colors: [{ name: "Biela", hex: "#f5f5f5", id: "mikina-biela-rukav" }, { name: "Tmavomodrá", hex: "#051937", id: "mikina-modra-rukav" }],
  },
  "tricko-biele-male-logo": {
    id: "tricko-biele-male-logo", name: "Tričko SZPH biele — malé logo", price: 24.90, category: "Tričká",
    images: ["/images/eshop/tricko-1.png", "/images/eshop/tricko-2.png"],
    description: "Biele športové tričko s malým logom SZPH na hrudi a nápisom Slovakia Field Hockey na chrbte. Ľahký priedušný materiál vhodný na tréning aj voľný čas.",
    details: ["Materiál: 100% polyester", "Malé logo SZPH na hrudi", "Nápis Slovakia Field Hockey na chrbte", "Priedušný a rýchloschnúci materiál", "Dostupné veľkosti: XS — XXL"],
  },
  "tricko-biele-velke-logo": {
    id: "tricko-biele-velke-logo", name: "Tričko SZPH biele — logo v predu", price: 27.90, category: "Tričká",
    images: ["/images/eshop/tricko-3.png", "/images/eshop/tricko-4.png"],
    description: "Biele tričko s veľkým logom SZPH na hrudi. Reprezentačný dizajn s hokejkou a slovenským znakom. Čistý zadný diel bez potlače.",
    details: ["Materiál: 100% polyester", "Veľké logo SZPH na hrudi", "Priedušný a rýchloschnúci materiál", "Dostupné veľkosti: XS — XXL"],
  },
  "tricko-bielo-modre": {
    id: "tricko-bielo-modre", name: "Tričko SZPH bielo-modré — malé logo", price: 27.90, category: "Tričká",
    images: ["/images/eshop/tricko-5.png", "/images/eshop/tricko-6.png"],
    description: "Športové tričko v bielo-modrom prevedení s tmavomodrými raglánovými rukávmi. Malé logo Field Hockey Slovakia na hrudi, nápis Slovakia Field Hockey na chrbte.",
    details: ["Materiál: 100% polyester", "Biely trup, tmavomodré raglánové rukávy", "Logo Field Hockey Slovakia na hrudi", "Nápis Slovakia Field Hockey na chrbte", "Dostupné veľkosti: XS — XXL"],
  },
  "polokosela-modra": {
    id: "polokosela-modra", name: "Polokošeľa SZPH tmavomodrá", price: 39.90, category: "Polokošele",
    images: ["/images/eshop/polokosela-1.png"],
    description: "Elegantná tmavomodrá polokošeľa s logom Field Hockey Slovakia na hrudi. Červeno-biele detaily na golieri a lemoch rukávov. Vhodná na oficiálne podujatia aj bežné nosenie.",
    details: ["Materiál: 95% bavlna, 5% elastan", "Tmavomodrá farba", "Logo Field Hockey Slovakia na hrudi", "Červeno-biele lemovanie goliera", "Dostupné veľkosti: S — XXL"],
    colors: [{ name: "Tmavomodrá", hex: "#051937", id: "polokosela-modra" }, { name: "Biela", hex: "#f5f5f5", id: "polokosela-biela" }],
  },
  "polokosela-biela": {
    id: "polokosela-biela", name: "Polokošeľa SZPH biela", price: 39.90, category: "Polokošele",
    images: ["/images/eshop/polokosela-2.png"],
    description: "Biela polokošeľa s logom Field Hockey Slovakia na hrudi. Červené detaily na golieri. Elegantný a čistý dizajn pre reprezentáciu aj voľný čas.",
    details: ["Materiál: 95% bavlna, 5% elastan", "Biela farba", "Logo Field Hockey Slovakia na hrudi", "Červené lemovanie goliera", "Dostupné veľkosti: S — XXL"],
    colors: [{ name: "Tmavomodrá", hex: "#051937", id: "polokosela-modra" }, { name: "Biela", hex: "#f5f5f5", id: "polokosela-biela" }],
  },
  "vetrovka": {
    id: "vetrovka", name: "Vetrovka SZPH biela", price: 59.90, category: "Bundy", badge: "Limitovaná edícia",
    images: ["/images/eshop/vetrovka-1.png"],
    description: "Športová vetrovka s kapucňou v bielo-modrom prevedení. Tmavomodré raglánové rukávy, nápis Slovakia Field Hockey na chrbte. Ideálna na tréningy a turnaje v chladnejšom počasí.",
    details: ["Materiál: 100% polyester, vodoodpudivá úprava", "Kapucňa", "Biely trup, tmavomodré rukávy", "Nápis Slovakia Field Hockey na chrbte", "Dostupné veľkosti: S — XXL"],
  },
};

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS[id];
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) return notFound();

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Breadcrumb */}
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-6 pb-4">
        <div className="flex items-center gap-2 text-[#94a3b8]" style={{ fontSize: "11px" }}>
          <Link href="/eshop" className="hover:text-[#051937] transition-colors font-bold">Eshop</Link>
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          <span className="text-[#051937] font-bold">{product.category}</span>
        </div>
      </div>

      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 xl:gap-12">

          {/* Ľavá — galéria */}
          <div>
            {/* Hlavný obrázok */}
            <div className="relative overflow-hidden bg-white mb-3" style={{ aspectRatio: "1/1", borderRadius: "4px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 font-bold text-white" style={{ fontSize: "10px", background: "#d80027", borderRadius: "3px" }}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnaily */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="relative overflow-hidden bg-white transition-all"
                    style={{
                      width: "80px", height: "80px", borderRadius: "4px",
                      border: activeImage === i ? "2px solid #012d74" : "1px solid rgba(1,45,116,0.08)",
                    }}
                  >
                    <Image src={img} alt="" fill className="object-contain p-2" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pravá — info */}
          <div className="lg:sticky lg:top-[140px] lg:self-start">
            <div className="bg-white p-6" style={{ borderRadius: "4px", border: "1px solid rgba(1,45,116,0.06)" }}>

              {/* Kategória */}
              <span className="font-bold uppercase text-[#012d74]" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                {product.category}
              </span>

              {/* Názov */}
              <h1 className="font-garet font-bold text-[#051937] mt-2 leading-tight" style={{ fontSize: "24px" }}>
                {product.name}
              </h1>

              {/* Cena */}
              <p className="font-garet font-bold text-[#012d74] mt-3" style={{ fontSize: "28px" }}>
                {product.price.toFixed(2)} €
              </p>

              {/* Farby */}
              {product.colors && (
                <div className="mt-5">
                  <p className="font-bold text-[#051937] mb-2" style={{ fontSize: "12px" }}>Farba</p>
                  <div className="flex gap-2">
                    {product.colors.map(c => (
                      <Link
                        key={c.id}
                        href={`/eshop/${c.id}`}
                        className="flex items-center justify-center rounded-full transition-all"
                        style={{
                          width: 36, height: 36,
                          border: c.id === product.id ? "2px solid #012d74" : "2px solid rgba(1,45,116,0.1)",
                          padding: "3px",
                        }}
                        title={c.name}
                      >
                        <div className="w-full h-full rounded-full" style={{ background: c.hex, border: c.hex === "#f5f5f5" ? "1px solid #e2e8f0" : "none" }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Veľkosť */}
              <div className="mt-5">
                <p className="font-bold text-[#051937] mb-2" style={{ fontSize: "12px" }}>Veľkosť</p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                      className="font-bold transition-all"
                      style={{
                        fontSize: "12px",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        border: selectedSize === s ? "2px solid #012d74" : "1px solid rgba(1,45,116,0.12)",
                        background: selectedSize === s ? "#012d74" : "#fff",
                        color: selectedSize === s ? "#fff" : "#051937",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Objednať */}
              <Link
                href={`/eshop/objednavka?produkt=${encodeURIComponent(product.name)}${selectedSize ? `&velkost=${selectedSize}` : ""}`}
                className="flex items-center justify-center gap-2 w-full mt-6 font-garet font-bold text-white transition-all hover:brightness-110"
                style={{ background: "#012d74", borderRadius: "4px", padding: "14px", fontSize: "14px" }}
              >
                Objednať
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <p className="text-[#94a3b8] text-center mt-2" style={{ fontSize: "11px" }}>
                Platba na mieste pri prevzatí
              </p>

              {/* Popis */}
              <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(1,45,116,0.06)" }}>
                <p className="text-[#334155] leading-relaxed" style={{ fontSize: "14px" }}>
                  {product.description}
                </p>
              </div>

              {/* Detaily */}
              <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(1,45,116,0.06)" }}>
                <p className="font-bold text-[#051937] mb-3" style={{ fontSize: "12px" }}>Detaily produktu</p>
                <ul className="space-y-1.5">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#012d74] shrink-0" />
                      <span className="text-[#64748b]" style={{ fontSize: "13px" }}>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
