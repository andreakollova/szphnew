import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ostatné",
  description: "Ďalšie informácie a dokumenty SZPH.",
};

const sections = [
  { title: "Zmluvy", href: "/ostatne/zmluvy", desc: "Zmluvy a dohody SZPH" },
  { title: "Zoznamy", href: "/ostatne/zoznamy", desc: "Zoznamy rozhodcov, trénerov a klubov" },
  { title: "Dobrovoľnícka činnosť", href: "/ostatne/dobrovolnicka-cinnost", desc: "Informácie o dobrovoľníctve v pozemnom hokeji" },
];

export default function OstatnePage() {
  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-8 pb-20">
        <h1
          className="font-garet font-bold italic text-[#051937] mb-8"
          style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}
        >
          Ostatné
        </h1>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white px-6 py-5 transition-colors hover:bg-[#f0f4fa]"
              style={{ borderRadius: "6px", border: "1px solid rgba(1,45,116,0.06)" }}
            >
              <h2 className="font-bold text-[#051937] group-hover:text-[#012d74] transition-colors" style={{ fontSize: "14px" }}>
                {s.title}
              </h2>
              <p className="text-[#64748b] mt-1" style={{ fontSize: "12px" }}>{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
