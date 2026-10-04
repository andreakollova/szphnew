"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";

interface SeedProduct {
  name: string;
  slug: string;
  price: number;
  category: string;
  images: string[];
  badge: string | null;
  description: string | null;
  sizes: string[];
  status: "published" | "draft";
  sort_order: number;
}

export function SeedProducts({ products }: { products: SeedProduct[] }) {
  const router = useRouter();
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSeed() {
    setSeeding(true);
    setError(null);

    try {
      const supabase = createBrowserSupabaseClient();

      // Check if table has any data first
      const { data: existing } = await supabase
        .from("products")
        .select("id")
        .limit(1);

      if (existing && existing.length > 0) {
        setError("Tabuľka už obsahuje produkty.");
        setSeeding(false);
        return;
      }

      const { error: insertError } = await supabase
        .from("products")
        .insert(products);

      if (insertError) throw new Error(insertError.message);

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nastala chyba pri seedovaní");
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="rounded p-6 text-center" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
      <p className="text-sm text-[#64748b] mb-3">
        Tabuľka produktov je prázdna. Chcete naplniť predvolené produkty z e-shopu?
      </p>
      {error && (
        <p className="text-sm text-red-500 mb-3">{error}</p>
      )}
      <button
        onClick={handleSeed}
        disabled={seeding}
        className="rounded bg-[#012d74] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#012d74]/90 disabled:opacity-50"
      >
        {seeding ? "Seedujem..." : "Naplniť produkty"}
      </button>
    </div>
  );
}
