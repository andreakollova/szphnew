import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projekty | SZPH",
  description:
    "Projekty Slovenského zväzu pozemného hokeja - Hokejová akadémia, Vzdelávanie rozhodcov, Hokej na školách, Hockey TV a SZPH Podcast.",
};

const projects = [
  {
    title: "Hokejová akadémia",
    href: "/projekty/hokejova-akademia",
    description:
      "Systematický program rozvoja mladých talentov pozemného hokeja na Slovensku. Akadémia poskytuje profesionálne tréningové podmienky, odborné vedenie a dlhodobú koncepciu výchovy hráčov od prípravky až po juniorské kategórie.",
  },
  {
    title: "Vzdelávanie rozhodcov",
    href: "/projekty/vzdelavanie-rozhodcov",
    description:
      "Komplexný vzdelávací program pre rozhodcov pozemného hokeja. Zahŕňa úvodné školenia pre nových rozhodcov, pravidelné doškoľovania, semináre k zmenám pravidiel a praktické hodnotenie výkonov počas súťažnej sezóny.",
  },
  {
    title: "Hokej na školách",
    href: "/projekty/hokej-na-skolach",
    description:
      "Projekt zameraný na propagáciu pozemného hokeja na základných a stredných školách po celom Slovensku. Cieľom je priblížiť tento šport čo najväčšiemu počtu detí a získať nových záujemcov pre kluby.",
  },
  {
    title: "Hockey TV",
    href: "/projekty/hockey-tv",
    description:
      "Livestreamy a videozáznamy zo zápasov slovenskej ligy pozemného hokeja, medzinárodných turnajov a reprezentačných stretnutí. Hockey TV prináša pozemný hokej priamo k divákom, nech sú kdekoľvek.",
  },
  {
    title: "SZPH Podcast",
    href: "/podcast",
    description:
      "Rozhovory s hráčmi, trénermi a osobnosťami slovenského pozemného hokeja. Podcast prináša pohľad do zákulisia tohto športu, príbehy z hrísk a diskusie o aktuálnom dianí v komunite.",
  },
];

export default function ProjektyPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            SZPH
          </span>
          <h1
            className="font-garet font-bold italic text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Projekty zväzu
          </h1>
          <p
            className="text-white mt-3 max-w-xl"
            style={{ fontSize: "15px" }}
          >
            Aktivity a iniciatívy Slovenského zväzu pozemného hokeja pre rozvoj
            športu na Slovensku.
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <div className="space-y-6">
          {projects.map((project) => (
            <Link
              key={project.href}
              href={project.href}
              className="block rounded-lg border border-[#e2e8f0] bg-white p-8 transition-shadow hover:shadow-md"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <h2
                className="font-garet font-bold text-[#051937] mb-2"
                style={{ fontSize: "24px" }}
              >
                {project.title}
              </h2>
              <p
                className="text-[#334155] leading-relaxed mb-4"
                style={{ fontSize: "15px" }}
              >
                {project.description}
              </p>
              <span
                className="inline-flex items-center gap-1.5 font-bold text-[#012d74]"
                style={{ fontSize: "14px" }}
              >
                Zistiť viac
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
