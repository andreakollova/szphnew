"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";

export function CompetitionActions({ id }: { id: string }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  async function handleDelete() {
    if (!confirm("Naozaj chcete zmazať túto súťaž? Tým sa zmažú aj všetky jej zápasy!")) return;
    setDeleting(true);
    await supabase.from("competitions").delete().eq("id", id);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/30 disabled:opacity-50"
    >
      {deleting ? "..." : "Zmazať"}
    </button>
  );
}
