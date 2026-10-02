import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getExerciseBySlug } from "@szph/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const ex = await getExerciseBySlug(supabase, slug);
  if (!ex) return { title: "Cvičenie nenájdené" };
  return {
    title: `${ex.title} - Cvičenia | SZPH`,
    description: ex.goal ?? undefined,
  };
}

export default async function ExerciseDetailPage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const ex = await getExerciseBySlug(supabase, slug);
  if (!ex) notFound();

  const source = ex.tips?.replace("Zdroj: ", "") ?? null;

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <Link href="/vzdelavanie/cvicenia" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-4 transition-colors">
            <span>&#8592;</span> Všetky cvičenia
          </Link>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            {ex.title}
          </h1>
          <div className="flex flex-wrap gap-3 mt-4">
            {ex.players && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                {ex.players} hráčov
              </span>
            )}
            {ex.age_group && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                {ex.age_group}
              </span>
            )}
            {ex.duration && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white">
                {ex.duration}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Diagram */}
          {ex.diagram_url && (
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden bg-[#2d8a3e] sticky top-28">
                <Image
                  src={ex.diagram_url}
                  alt={ex.title}
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}

          {/* Details */}
          <div className={ex.diagram_url ? "lg:col-span-3" : "lg:col-span-5"}>
            {/* Goal */}
            <div className="rounded-lg p-6 mb-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              <h2 className="font-bold text-[#051937] mb-2" style={{ fontSize: "16px" }}>Cieľ cvičenia</h2>
              <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.7 }}>{ex.goal}</p>
            </div>

            {/* Equipment */}
            {ex.equipment && (
              <div className="rounded-lg p-6 mb-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
                <h2 className="font-bold text-[#051937] mb-2" style={{ fontSize: "16px" }}>Čo budeme potrebovať</h2>
                <p className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.7 }}>{ex.equipment}</p>
              </div>
            )}

            {/* Description */}
            {ex.description && (
              <div className="rounded-lg p-6 mb-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
                <h2 className="font-bold text-[#051937] mb-3" style={{ fontSize: "16px" }}>Popis cvičenia</h2>
                <div className="text-[#334155] space-y-4" style={{ fontSize: "15px", lineHeight: 1.7 }}>
                  {ex.description.split("\n\n").map((block, i) => (
                    <div key={i}>
                      {block.split("\n").map((line, j) => {
                        if (line.endsWith(":")) {
                          return <p key={j} className="font-semibold text-[#051937] mt-2 first:mt-0">{line}</p>;
                        }
                        return <p key={j}>{line}</p>;
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Harder / Easier */}
            {(ex.harder || ex.easier) && (
              <div className="rounded-lg p-6 mb-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
                {ex.easier && (
                  <div className="mb-4">
                    <h2 className="font-bold text-emerald-600 mb-2" style={{ fontSize: "16px" }}>Uľahčenie</h2>
                    <div className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.7 }}>
                      {ex.easier.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}
                {ex.harder && (
                  <div>
                    <h2 className="font-bold text-amber-600 mb-2" style={{ fontSize: "16px" }}>Zťažte to</h2>
                    <div className="text-[#334155]" style={{ fontSize: "15px", lineHeight: 1.7 }}>
                      {ex.harder.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Source */}
            {source && (
              <p className="text-[#94a3b8] text-xs mt-4">
                Zdroj: {source}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
