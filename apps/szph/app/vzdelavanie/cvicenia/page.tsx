import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { getPublishedExercises } from "@szph/db";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cvičenia - Slovenský pozemnohokejový zväz",
  description: "Tréningové cvičenia pre pozemný hokej. Cvičenia na útok, obranu, nahrávky a techniku pre rôzne vekové kategórie.",
};

export default async function CviceniaPage() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  const exercises = await getPublishedExercises(supabase, { limit: 50 }).catch(() => []);

  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>
            Vzdelávanie
          </span>
          <h1 className="font-garet font-bold italic text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Tréningové cvičenia
          </h1>
          <p className="text-white mt-3 max-w-xl" style={{ fontSize: "15px" }}>
            Databáza cvičení pre trénerov pozemného hokeja. Cvičenia na útok, obranu, nahrávky a techniku pre rôzne vekové kategórie.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        {exercises.length === 0 ? (
          <div className="py-20 text-center text-[#64748b]">Žiadne cvičenia</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {exercises.map((ex) => (
              <Link
                key={ex.id}
                href={`/vzdelavanie/cvicenia/${ex.slug}`}
                className="group rounded-lg overflow-hidden transition-shadow hover:shadow-lg"
                style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
              >
                {ex.diagram_url && (
                  <div className="relative w-full aspect-[4/3] bg-[#2d8a3e] overflow-hidden">
                    <Image
                      src={ex.diagram_url}
                      alt={ex.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-[#051937] mb-2" style={{ fontSize: "17px" }}>{ex.title}</h3>
                  <p className="text-[#334155] text-sm mb-3 line-clamp-2">{ex.goal}</p>
                  <div className="flex flex-wrap gap-2">
                    {ex.players && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#051937]/5 px-2.5 py-1 text-xs font-medium text-[#051937]">
                        {ex.players} hráčov
                      </span>
                    )}
                    {ex.age_group && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#016fb4]/10 px-2.5 py-1 text-xs font-medium text-[#016fb4]">
                        {ex.age_group}
                      </span>
                    )}
                    {ex.duration && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600">
                        {ex.duration}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
