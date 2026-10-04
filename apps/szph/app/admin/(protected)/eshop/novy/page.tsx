import { EditProductForm } from "../EditProductForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nový produkt - Admin" };

export default function NovyProduktPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Nový produkt</h1>
        <p className="text-sm text-[#64748b] mt-1">Vytvorte nový produkt pre e-shop</p>
      </div>
      <EditProductForm />
    </div>
  );
}
