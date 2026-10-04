import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";
import { DeleteProductButton } from "./DeleteProductButton";

export const metadata: Metadata = { title: "E-shop - Admin" };

const SEED_PRODUCTS = [
  {
    name: "Mikina SZPH biela — logo v predu",
    slug: "mikina-biela-logo",
    price: 44.90,
    category: "mikiny",
    images: ["/images/eshop/mikina-biela-1.webp", "/images/eshop/mikina-biela-2.webp"],
    badge: "Novinka",
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 1,
  },
  {
    name: "Mikina SZPH biela — logo na rukáve",
    slug: "mikina-biela-rukav",
    price: 44.90,
    category: "mikiny",
    images: ["/images/eshop/mikina-biela-3.webp", "/images/eshop/mikina-biela-4.webp"],
    badge: "Novinka",
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 2,
  },
  {
    name: "Mikina SZPH tmavomodrá — logo v predu",
    slug: "mikina-modra-logo",
    price: 44.90,
    category: "mikiny",
    images: ["/images/eshop/mikina-modra-1.webp", "/images/eshop/mikina-modra-2.webp"],
    badge: "Novinka",
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 3,
  },
  {
    name: "Mikina SZPH tmavomodrá — logo na rukáve",
    slug: "mikina-modra-rukav",
    price: 44.90,
    category: "mikiny",
    images: ["/images/eshop/mikina-modra-3.webp", "/images/eshop/mikina-modra-4.webp"],
    badge: "Novinka",
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 4,
  },
  {
    name: "Tričko SZPH biele — malé logo",
    slug: "tricko-biele-male-logo",
    price: 24.90,
    category: "tricka",
    images: ["/images/eshop/tricko-1.webp", "/images/eshop/tricko-2.webp"],
    badge: null,
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 5,
  },
  {
    name: "Tričko SZPH biele — logo v predu",
    slug: "tricko-biele-velke-logo",
    price: 27.90,
    category: "tricka",
    images: ["/images/eshop/tricko-3.webp", "/images/eshop/tricko-4.webp"],
    badge: null,
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 6,
  },
  {
    name: "Tričko SZPH bielo-modré — malé logo",
    slug: "tricko-bielo-modre",
    price: 27.90,
    category: "tricka",
    images: ["/images/eshop/tricko-5.webp", "/images/eshop/tricko-6.webp"],
    badge: null,
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 7,
  },
  {
    name: "Polokošeľa SZPH tmavomodrá",
    slug: "polokosela-modra",
    price: 39.90,
    category: "polokosele",
    images: ["/images/eshop/polokosela-1.webp"],
    badge: null,
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 8,
  },
  {
    name: "Polokošeľa SZPH biela",
    slug: "polokosela-biela",
    price: 39.90,
    category: "polokosele",
    images: ["/images/eshop/polokosela-2.webp"],
    badge: null,
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 9,
  },
  {
    name: "Vetrovka SZPH biela",
    slug: "vetrovka",
    price: 59.90,
    category: "bundy",
    images: ["/images/eshop/vetrovka-1.webp"],
    badge: "Limitovaná edícia",
    description: null,
    sizes: ["S", "M", "L", "XL"],
    status: "published" as const,
    sort_order: 10,
  },
];

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  images: string[];
  badge: string | null;
  status: string;
  sort_order: number;
  updated_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  mikiny: "Mikiny",
  tricka: "Tričká",
  polokosele: "Polokošele",
  bundy: "Bundy",
};

async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order");

    if (error) throw error;

    // Auto-seed if table is empty
    if (!data || data.length === 0) {
      await supabase.from("products").insert(SEED_PRODUCTS);
      const { data: seeded } = await supabase
        .from("products")
        .select("*")
        .order("sort_order");
      return (seeded as Product[]) ?? [];
    }

    return (data as Product[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AdminEshopPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">E-shop produkty</h1>
          <p className="text-sm text-[#64748b] mt-1">{products.length} produktov celkovo</p>
        </div>
        <Link
          href="/admin/eshop/novy"
          className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#012d74]/90"
        >
          + Nový produkt
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded py-16 text-center text-[#64748b]" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          Žiadne produkty. Vytvorte prvý!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded overflow-hidden group"
              style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
            >
              {/* Obrázok */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", background: "#f7f7f9" }}>
                {product.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-contain p-4"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[#94a3b8] text-xs">
                    Bez obrázka
                  </div>
                )}
                {/* Status badge */}
                <span
                  className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    product.status === "published"
                      ? "bg-emerald-500/20 text-emerald-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {product.status === "published" ? "Publikovaný" : "Draft"}
                </span>
                {product.badge && (
                  <span
                    className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold text-white"
                    style={{ background: "#d80027", borderRadius: "3px" }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="font-semibold text-[#051937] text-sm line-clamp-2">{product.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="font-bold text-[#012d74] text-sm">{product.price.toFixed(2)} €</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-[#64748b]">
                    {CATEGORY_LABELS[product.category] || product.category}
                  </span>
                </div>
              </div>

              {/* Akcie */}
              <div className="flex items-center gap-2 px-3 pb-3">
                <Link
                  href={`/admin/eshop/upravit/${product.id}`}
                  className="flex-1 rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] text-center transition-colors hover:bg-gray-200"
                >
                  Upraviť
                </Link>
                <DeleteProductButton id={product.id} name={product.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
