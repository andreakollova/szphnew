import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { EditProductForm } from "../../EditProductForm";
import type { Metadata } from "next";
import type { Product } from "@szph/db/types";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: "Upraviť produkt - Admin" };

export default async function UpravitProduktPage({ params }: Props) {
  const { id } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Upraviť produkt</h1>
        <p className="text-sm text-[#64748b] mt-1">{product.name}</p>
      </div>
      <EditProductForm product={product as Product} />
    </div>
  );
}
