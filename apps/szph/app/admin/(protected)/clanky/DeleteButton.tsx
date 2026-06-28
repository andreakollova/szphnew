"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@szph/db/client";

export function DeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Naozaj chcete vymazať článok "${title}"?`)) return;
    setDeleting(true);
    const supabase = createBrowserSupabaseClient();
    await supabase.from("articles").delete().eq("id", id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-lg bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/25 disabled:opacity-50"
    >
      {deleting ? "..." : "Vymazať"}
    </button>
  );
}
