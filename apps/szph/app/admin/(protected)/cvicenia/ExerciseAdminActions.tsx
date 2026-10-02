"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import type { Exercise } from "@szph/db";

export function ExerciseAdminActions({ exercise }: { exercise: Exercise }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const supabase = createBrowserSupabaseClient();

  async function handleDelete() {
    if (!confirm(`Vymazať cvičenie "${exercise.title}"?`)) return;
    setDeleting(true);
    await supabase.from("exercises").delete().eq("id", exercise.id);
    router.refresh();
  }

  async function toggleStatus() {
    const newStatus = exercise.status === "published" ? "draft" : "published";
    await supabase
      .from("exercises")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", exercise.id);
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={toggleStatus}
        className="rounded px-2.5 py-1 text-xs font-semibold text-[#012d74] hover:bg-[#012d74]/10 transition-colors"
      >
        {exercise.status === "published" ? "Skryť" : "Publikovať"}
      </button>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="rounded px-2.5 py-1 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
      >
        {deleting ? "..." : "Vymazať"}
      </button>
    </div>
  );
}
