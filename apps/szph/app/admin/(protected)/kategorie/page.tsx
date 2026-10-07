"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Category, NominationPlayer, Achievement } from "@szph/db/types";

/* ── Seed data (inserts once if table is empty) ──────────────────── */
const SEED_CATEGORIES: Omit<Category, "id" | "created_at" | "updated_at">[] = [
  {
    name: "Muzi A",
    slug: "muzi",
    type: "reprezentacia",
    description: "Seniorska muzska reprezentacia Slovenska v pozemnom hokeji.",
    sort_order: 1,
    status: "published",
    champions: null,
    nominations: [
      { number: 1, name: "BOGAR Jakub", club: "SK Slavia Praha" },
      { number: 7, name: "VACHA Tomas", club: "KPH Raca" },
      { number: 10, name: "ROMANEC Tomas (C)", club: "KPH Raca" },
      { number: 11, name: "PETRAS Daniel", club: "Klipper THC Hamburg" },
      { number: 13, name: "AUGUSTINIC Adrian", club: "PH Plzen-Litice" },
      { number: 16, name: "GARAJ Richard", club: "KPH Raca" },
      { number: 9, name: "KAJABA Matus", club: "KPH Raca" },
      { number: 18, name: "BLAZOVSKY Michal", club: "HC 1952 Senkvice" },
      { number: 20, name: "KRAMPL Matej", club: "KPH Raca" },
      { number: 23, name: "BOGAR Juraj", club: "KPH Raca" },
      { number: 24, name: "BARATH Tomas", club: "HC 1952 Senkvice" },
      { number: 26, name: "BELOSOVIC Simon", club: "KPH Raca" },
    ],
    achievements: [
      { year: "2026", form: "Hala", event: "ME II-A, Sveti Ivan Zelina", result: "3. miesto" },
      { year: "2024", form: "Hala", event: "ME II-B, Budapest", result: "3. miesto" },
      { year: "2021", form: "Vonku", event: "ME III, Lousada", result: "5. miesto" },
      { year: "2018", form: "Hala", event: "ME III, Nikozia", result: "2. miesto" },
      { year: "2015", form: "Vonku", event: "ME IV, Vilnius", result: "1. miesto, postup do III. divizie" },
      { year: "2009", form: "Vonku", event: "ME IV, Bratislava", result: "2. miesto" },
      { year: "2008", form: "Hala", event: "Nations Trophy II, Kodan", result: "3. miesto" },
    ],
  },
  {
    name: "Zeny A",
    slug: "zeny",
    type: "reprezentacia",
    description: "Seniorska zenska reprezentacia Slovenska v pozemnom hokeji.",
    sort_order: 2,
    status: "published",
    champions: null,
    nominations: [
      { number: 1, name: "SUTOVSKA Daniela (GK)", club: "KPH Raca" },
      { number: 2, name: "LISKOVA Natalia (GK)", club: "KPH HOKO Zlate Moravce" },
      { number: 3, name: "VYSKOCOVA Karolina", club: "KPH Raca" },
      { number: 7, name: "MEDVIKOVA Sarlota", club: "KPH Raca" },
      { number: 8, name: "CAPOVA Vanessa", club: "KPH HOKO Zlate Moravce" },
      { number: 9, name: "HUSKOVA Bianka", club: "KPH Raca" },
      { number: 10, name: "KRAMPLOVA Lenka", club: "KPH Raca" },
      { number: 12, name: "FONDRKOVA Natalia (C)", club: "KPH Raca" },
      { number: 14, name: "SURINOVA Martina", club: "KPH HOKO Zlate Moravce" },
      { number: 18, name: "HORACKOVA Lenka", club: "KPH Raca" },
      { number: 20, name: "MESZAROS Reka", club: "KPH Raca" },
    ],
    achievements: [
      { year: "2023", form: "Vonku", event: "ME II, Praha", result: "8. miesto" },
      { year: "2022", form: "Hala", event: "ME III, Bratislava", result: "2. miesto" },
      { year: "2018", form: "Hala", event: "ME III, Apace", result: "2. miesto" },
      { year: "2010", form: "Hala", event: "Nations Trophy II, Nymburk", result: "3. miesto" },
      { year: "2005", form: "Vonku", event: "ME III, Praha", result: "3. miesto" },
      { year: "1996, 1998, 2000", form: "Hala", event: "Elitne ME", result: "Trikrat 5. miesto" },
    ],
  },
  {
    name: "U21 Muzi",
    slug: "u21-muzi",
    type: "reprezentacia",
    description: "Mladeznicka muzska reprezentacia Slovenska do 21 rokov.",
    sort_order: 3,
    status: "published",
    nominations: null,
    champions: null,
    achievements: [
      { year: "2025", form: "Hala", event: "ME II, Lousada", result: "2. miesto" },
      { year: "2019", form: "Hala", event: "ME II, Paredes", result: "2. miesto" },
      { year: "2015, 2017", form: "Hala", event: "ME II", result: "3. miesto v oboch rokoch" },
      { year: "2012", form: "Vonku", event: "ME III-B, Bratislava", result: "2. miesto" },
      { year: "2010, 2014", form: "Vonku", event: "ME III", result: "3. miesto v oboch rokoch" },
      { year: "2002, 2007, 2013", form: "Hala", event: "II. uroven", result: "3. miesto v kazdom rocniku" },
      { year: "1998", form: "Hala", event: "II. uroven, Bratislava", result: "2. miesto" },
    ],
  },
  {
    name: "U21 Zeny",
    slug: "u21-zeny",
    type: "reprezentacia",
    description: "Mladeznicka zenska reprezentacia Slovenska do 21 rokov.",
    sort_order: 4,
    status: "published",
    nominations: null,
    champions: null,
    achievements: [
      { year: "2019", form: "Hala", event: "ME II", result: "2. miesto" },
      { year: "2007", form: "Hala", event: "Elitne ME, Vieden", result: "4. miesto" },
      { year: "2006, 2008", form: "Vonku", event: "ME III", result: "3. miesto v oboch rokoch" },
      { year: "2005", form: "Hala", event: "II. uroven, Bratislava", result: "1. miesto" },
      { year: "2001, 2011", form: "Hala", event: "II. uroven", result: "3. miesto v oboch rokoch" },
      { year: "1994", form: "Hala", event: "Elitne ME, Llodio", result: "3. miesto v Europe" },
    ],
  },
  { name: "Extraliga muži", slug: "extraliga-muzi", type: "liga", description: null, sort_order: 10, status: "published", nominations: null, achievements: null, champions: null },
  { name: "Extraliga ženy", slug: "extraliga-zeny", type: "liga", description: null, sort_order: 11, status: "published", nominations: null, achievements: null, champions: null },
  { name: "U18", slug: "u18", type: "liga", description: null, sort_order: 12, status: "published", nominations: null, achievements: null, champions: null },
  { name: "U14", slug: "u14", type: "liga", description: null, sort_order: 13, status: "published", nominations: null, achievements: null, champions: null },
  { name: "U12", slug: "u12", type: "liga", description: null, sort_order: 14, status: "published", nominations: null, achievements: null, champions: null },
];

async function seedIfEmpty(supabase: ReturnType<typeof createBrowserSupabaseClient>) {
  const { data, error } = await supabase.from("categories").select("id").limit(1);
  if (error) return; // table might not exist
  if (data && data.length > 0) return; // already seeded
  await supabase.from("categories").insert(SEED_CATEGORIES);
}

/* ── Component ───────────────────────────────────────────────────── */

export default function AdminKategoriePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableError, setTableError] = useState(false);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    (async () => {
      await seedIfEmpty(supabase);
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) {
        setTableError(true);
      } else {
        setCategories(data || []);
      }
      setLoading(false);
    })();
  }, []);

  const repre = categories.filter((c) => c.type === "reprezentacia");
  const liga = categories.filter((c) => c.type === "liga");

  if (loading) return <div className="text-[#64748b]">Nacitavam...</div>;

  if (tableError) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#051937]">Kategorie</h1>
        <div className="rounded p-8 text-center" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <p className="text-[#64748b] mb-2">Tabulka <code>categories</code> este neexistuje v Supabase.</p>
          <p className="text-xs text-[#94a3b8]">Vytvorte ju v Supabase dashboarde podla dokumentacie a obnovte stranku.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Kategorie</h1>
          <p className="text-sm text-[#64748b] mt-1">{categories.length} kategorii</p>
        </div>
        <Link
          href="/admin/kategorie/nova"
          className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#012d74]/90 transition-all"
        >
          + Nova kategoria
        </Link>
      </div>

      {/* Reprezentacia */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#051937] mb-3">Reprezentacia</h2>
        <CategoryTable categories={repre} />
      </div>

      {/* Liga */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#051937] mb-3">Liga</h2>
        <CategoryTable categories={liga} />
      </div>
    </div>
  );
}

function CategoryTable({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return (
      <div className="rounded py-10 text-center text-[#64748b]" style={{ background: "#fff", border: "1px solid rgba(1,45,116,0.08)" }}>
        Ziadne kategorie
      </div>
    );
  }

  return (
    <div className="rounded overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[rgba(1,45,116,0.08)]">
            <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Nazov</th>
            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Slug</th>
            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Status</th>
            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Nominacia</th>
            <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Uspechy</th>
            <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
              <td className="px-5 py-4 font-semibold text-[#051937]">{cat.name}</td>
              <td className="px-4 py-4 text-[#64748b] font-mono text-xs">{cat.slug}</td>
              <td className="px-4 py-4">
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{
                    background: cat.status === "published" ? "#dcfce7" : "#f1f5f9",
                    color: cat.status === "published" ? "#15803d" : "#64748b",
                  }}
                >
                  {cat.status === "published" ? "Publikovaný" : "Koncept"}
                </span>
              </td>
              <td className="px-4 py-4 text-[#64748b]">
                {cat.nominations ? `${cat.nominations.length} hracov` : "-"}
              </td>
              <td className="px-4 py-4 text-[#64748b]">
                {cat.achievements ? `${cat.achievements.length}` : "-"}
              </td>
              <td className="px-4 py-4 text-right">
                <Link
                  href={`/admin/kategorie/${cat.id}`}
                  className="rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors"
                >
                  Upravit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
