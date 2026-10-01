"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { key: "all", label: "Všetko" },
  { key: "mikiny", label: "Mikiny" },
  { key: "tricka", label: "Tričká" },
  { key: "polokosele", label: "Polokošele" },
  { key: "bundy", label: "Bundy" },
];

const PRODUCTS = [
  {
    id: "mikina-biela-logo",
    name: "Mikina SZPH biela — logo v predu",
    price: 44.90,
    category: "mikiny",
    images: ["/images/eshop/mikina-biela-1.png", "/images/eshop/mikina-biela-2.png"],
    badge: "Novinka",
  },
  {
    id: "mikina-biela-rukav",
    name: "Mikina SZPH biela — logo na rukáve",
    price: 44.90,
    category: "mikiny",
    images: ["/images/eshop/mikina-biela-3.png", "/images/eshop/mikina-biela-4.png"],
    badge: "Novinka",
  },
  {
    id: "mikina-modra-logo",
    name: "Mikina SZPH tmavomodrá — logo v predu",
    price: 44.90,
    category: "mikiny",
    images: ["/images/eshop/mikina-modra-1.png", "/images/eshop/mikina-modra-2.png"],
    badge: "Novinka",
  },
  {
    id: "mikina-modra-rukav",
    name: "Mikina SZPH tmavomodrá — logo na rukáve",
    price: 44.90,
    category: "mikiny",
    images: ["/images/eshop/mikina-modra-3.png", "/images/eshop/mikina-modra-4.png"],
    badge: "Novinka",
  },
  {
    id: "tricko-biele-male-logo",
    name: "Tričko SZPH biele — malé logo",
    price: 24.90,
    category: "tricka",
    images: ["/images/eshop/tricko-1.png", "/images/eshop/tricko-2.png"],
  },
  {
    id: "tricko-biele-velke-logo",
    name: "Tričko SZPH biele — logo v predu",
    price: 27.90,
    category: "tricka",
    images: ["/images/eshop/tricko-3.png", "/images/eshop/tricko-4.png"],
  },
  {
    id: "tricko-bielo-modre",
    name: "Tričko SZPH bielo-modré — malé logo",
    price: 27.90,
    category: "tricka",
    images: ["/images/eshop/tricko-5.png", "/images/eshop/tricko-6.png"],
  },
  {
    id: "polokosela-modra",
    name: "Polokošeľa SZPH tmavomodrá",
    price: 39.90,
    category: "polokosele",
    images: ["/images/eshop/polokosela-1.png"],
  },
  {
    id: "polokosela-biela",
    name: "Polokošeľa SZPH biela",
    price: 39.90,
    category: "polokosele",
    images: ["/images/eshop/polokosela-2.png"],
  },
  {
    id: "vetrovka",
    name: "Vetrovka SZPH biela",
    price: 59.90,
    category: "bundy",
    images: ["/images/eshop/vetrovka-1.png"],
    badge: "Limitovaná edícia",
  },
];

export default function EshopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-14 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[1600px] mx-auto px-0 lg:px-4">
          <span className="font-bold uppercase text-white/40 mb-3 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Oficiálny obchod
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            SZPH Eshop
          </h1>
          <p className="text-white/50 mt-2 max-w-xl" style={{ fontSize: "14px" }}>
            Oficiálne oblečenie a merch Slovenského zväzu pozemného hokeja.
          </p>
        </div>
      </div>

      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-8">

        {/* Kategórie */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="shrink-0 px-5 py-2 font-bold uppercase transition-all"
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                borderRadius: "20px",
                border: "1px solid rgba(1,45,116,0.12)",
                background: activeCategory === cat.key ? "#012d74" : "transparent",
                color: activeCategory === cat.key ? "#fff" : "#64748b",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Produkty grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(product => (
            <Link
              key={product.id}
              href={`/eshop/${product.id}`}
              className="group block bg-white overflow-hidden transition-all hover:shadow-md"
              style={{ borderRadius: "4px", border: "1px solid rgba(1,45,116,0.06)" }}
            >
              {/* Obrázok s hover swap */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", background: "#f0f2f5" }}>
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className={`object-contain p-4 transition-all duration-500 ${product.images.length > 1 ? "group-hover:opacity-0" : "group-hover:scale-105"}`}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                {product.images.length > 1 && (
                  <Image
                    src={product.images[1]}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-all duration-500 opacity-0 group-hover:opacity-100"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 font-bold text-white" style={{ fontSize: "9px", background: "#d80027", borderRadius: "3px", letterSpacing: "0.05em" }}>
                    {product.badge}
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-[#051937] leading-snug group-hover:text-[#012d74] transition-colors line-clamp-2" style={{ fontSize: "13px" }}>
                  {product.name}
                </h3>
                <p className="font-garet font-bold text-[#012d74] mt-2" style={{ fontSize: "16px" }}>
                  {product.price.toFixed(2)} €
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Info banner */}
        <div className="mt-10 p-6 flex items-start gap-4" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
          <svg className="h-5 w-5 text-[#012d74] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <div>
            <p className="font-bold text-[#051937] mb-1" style={{ fontSize: "14px" }}>Objednávky a doprava</p>
            <p className="text-[#64748b]" style={{ fontSize: "13px" }}>
              Pre objednanie produktu nás kontaktujte na <a href="mailto:szph@szph.sk" className="font-bold text-[#012d74] hover:underline">szph@szph.sk</a> alebo <a href="tel:+421918555519" className="font-bold text-[#012d74] hover:underline">+421 918 555 519</a>. Doručenie po celom Slovensku.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
