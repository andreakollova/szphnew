import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { notFound } from "next/navigation";
import { EditExerciseForm } from "./EditExerciseForm";
import type { Metadata } from "next";

interface Props { params: Promise<{ id: string }> }

export const metadata: Metadata = { title: "Upraviť cvičenie" };

export default async function UpravitCviceniePage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const { data: exercise, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !exercise) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#051937]">Upraviť cvičenie</h1>
      <EditExerciseForm exercise={exercise as any} />
    </div>
  );
}
