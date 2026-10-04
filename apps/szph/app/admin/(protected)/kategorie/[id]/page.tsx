"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Category } from "@szph/db/types";
import { EditCategoryForm } from "./EditCategoryForm";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error: err }) => {
        if (err || !data) {
          setError(true);
        } else {
          setCategory(data as Category);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-[#64748b]">Nacitavam...</div>;
  if (error || !category) return <div className="text-red-500">Kategoria sa nenasla.</div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-[#051937]">Upravit kategoriu: {category.name}</h1>
      <EditCategoryForm category={category} />
    </div>
  );
}
