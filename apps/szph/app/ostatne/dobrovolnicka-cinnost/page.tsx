import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dobrovoľnícka činnosť",
  description: "Prehľad dobrovoľníckej činnosti SZPH na základných školách.",
};

const ITEMS = [
  { name: "ZŠ Šenkvice", year: "2019/2020" },
  { name: "ZŠ Robotnícka Zl. Moravce", year: "2019/2020" },
  { name: "ZŠ Mojmírova Zl. Moravce", year: "2019/2020" },
  { name: "ZŠ Tbiliská Bratislava", year: "2019/2020", note: "2." },
  { name: "ZŠ Tbiliská Bratislava", year: "2019/2020", note: "1." },
  { name: "ZŠ Janka Kráľa Nová Dubnica", year: "2019/2020" },
  { name: "CVČ Nová Dubnica", year: "2019/2020" },
  { name: "ZŠ Tbiliska Bratislava", year: "2018/2019" },
  { name: "ZŠ Karatíny Brúderovej Bratislava", year: "2018/2019" },
  { name: "ZŠ Mojmírova Zl. Moravce", year: "2018/2019" },
  { name: "ZŠ Hubeného Bratislava", year: "2018/2019" },
  { name: "ZŠ Šenkvice", year: "2018/2019" },
  { name: "ZŠ Hubeného Bratislava", year: "2017 / 2018" },
  { name: "ZŠ Tbiliska Bratislava", year: "2017 / 2018" },
  { name: "ZŠ Karatíny Brúderovej Bratislava", year: "2017 / 2018" },
  { name: "ZŠ Mojmírova Zl. Moravce", year: "2017 / 2018" },
  { name: "ZŠ Šenkvice", year: "2017 / 2018" },
];

export default function DobrovolnickaPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span className="font-bold uppercase text-white/40 mb-4 block" style={{ fontSize: "10px", letterSpacing: "0.14em" }}>Ostatné</span>
          <h1 className="font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Dobrovoľnícka činnosť</h1>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto px-6 pt-12">
        <div className="space-y-3">
          {ITEMS.map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
              <span className="font-semibold text-[#051937]" style={{ fontSize: "15px" }}>{item.note ? `${item.note} ` : ""}{item.name}</span>
              <span className="shrink-0 rounded-full px-3 py-1 font-bold text-[#051937]/50" style={{ fontSize: "12px", background: "rgba(1,45,116,0.06)" }}>{item.year}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
