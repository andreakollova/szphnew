import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getAllExercisesAdmin } from "@szph/db";
import { AddExerciseForm } from "./AddExerciseForm";
import { ExerciseAdminActions } from "./ExerciseAdminActions";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cvičenia" };

export default async function AdminCviceniaPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const exercises = await getAllExercisesAdmin(supabase, { limit: 50 }).catch(() => []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Cvičenia</h1>
          <p className="text-sm text-[#64748b] mt-1">{exercises.length} cvičení</p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-md p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-4">Pridať cvičenie</h2>
        <AddExerciseForm />
      </div>

      {/* List */}
      <div className="rounded-md overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        {exercises.length === 0 ? (
          <div className="py-12 text-center text-[#64748b]">Žiadne cvičenia</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(1,45,116,0.08)]">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Názov</th>
                <th className="hidden px-4 py-3 text-center text-[10px] uppercase tracking-wider text-[#64748b] md:table-cell">Hráči</th>
                <th className="hidden px-4 py-3 text-center text-[10px] uppercase tracking-wider text-[#64748b] md:table-cell">Vek</th>
                <th className="hidden px-4 py-3 text-center text-[10px] uppercase tracking-wider text-[#64748b] md:table-cell">Trvanie</th>
                <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-[#64748b]">Stav</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((ex) => (
                <tr key={ex.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#051937] line-clamp-1">{ex.title}</p>
                    <p className="text-xs text-[#64748b] line-clamp-1 mt-0.5">{ex.goal}</p>
                  </td>
                  <td className="hidden px-4 py-4 text-center text-xs text-[#64748b] md:table-cell">{ex.players ?? "-"}</td>
                  <td className="hidden px-4 py-4 text-center text-xs text-[#64748b] md:table-cell">{ex.age_group ?? "-"}</td>
                  <td className="hidden px-4 py-4 text-center text-xs text-[#64748b] md:table-cell">{ex.duration ?? "-"}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${ex.status === "published" ? "bg-emerald-500/20 text-emerald-400" : "bg-gray-100 text-[#64748b]"}`}>
                      {ex.status === "published" ? "Pub." : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <ExerciseAdminActions exercise={ex} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
