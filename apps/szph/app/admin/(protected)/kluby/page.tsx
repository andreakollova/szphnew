import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import type { Metadata } from "next";
import { DeleteClubButton } from "./DeleteClubButton";

export const metadata: Metadata = { title: "Kluby" };

function getSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}

const SEED_CLUBS = [
  { name: "KPH Rača", short_name: "RAČ", city: "Bratislava", phone: "0903 714 909", email: "kphraca@kphraca.sk", web: "https://www.kphraca.sk", facebook: "KPH Rača Bratislava", logo_url: "/images/timy/RAC-hq.png", address: "Jurkovičova 5, 831 06 Bratislava", ico: "31795773", chairman: "Ing. Peter Romanec", account: "SK27310000000040700062032", sort_order: 0 },
  { name: "HC 1952 Šenkvice", short_name: "ŠEN", city: "Šenkvice", phone: "0903 754 769", email: "pozemnyhokej1952@gmail.com", web: "https://hockeysenkvice.sk/", facebook: "HC 1952 Šenkvice", logo_url: "/images/timy/SEN-hq.png", address: "Domovina 55, 900 81 Šenkvice", ico: "55935842", chairman: "Milan Dugovič", account: "SK2209000000000019187856", sort_order: 1 },
  { name: "HA Šenkvice", short_name: "HAŠ", city: "Šenkvice", phone: "0908 777 623", email: "has@hockeysenkvice.sk", web: "https://hockeysenkvice.sk/", facebook: "Hokejová Akadémia Šenkvice", logo_url: "/images/timy/HAS-hq.png", address: "Domovina 55, 900 81 Šenkvice", ico: "34004106", chairman: "Zuzana Krajčírová", sort_order: 2 },
  { name: "HKM Nová Dubnica", short_name: "HKM", city: "Nová Dubnica", phone: "0910 928 292", email: "hkmnovadubnica@gmail.com", web: "https://www.hkmnovadubnica.sk/", facebook: "HKM Nová Dubnica", logo_url: "/images/timy/NOV-hq.png", address: "P. O. Hviezdoslava 14/2, 018 51 Nová Dubnica", ico: "37917099", chairman: "Ing. Zuzana Hoštáková", account: "SK49 0200 0000 0023 3304 6751", sort_order: 3 },
  { name: "KPH HOKO Zlaté Moravce", short_name: "HOKO", city: "Zlaté Moravce", phone: "0903 915 108", email: "kph.hoko@gmail.com", facebook: "KPH HOKO Zlaté Moravce", logo_url: "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp", address: "Továrenská 39, 953 01 Zlaté Moravce", ico: "37854887", chairman: "Zuzana Jakabová", account: "SK07 0900 0000 0002 3223 0972", sort_order: 4 },
];

async function getClubs() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("clubs")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;

    // Auto-seed if empty
    if (!data || data.length === 0) {
      await supabase.from("clubs").insert(SEED_CLUBS.map(c => ({ ...c, status: "published" })));
      const { data: seeded } = await supabase.from("clubs").select("*").order("sort_order", { ascending: true });
      return seeded || [];
    }

    return data;
  } catch {
    return [];
  }
}

export default async function AdminKlubyPage() {
  const clubs = await getClubs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Kluby</h1>
          <p className="text-sm text-[#64748b] mt-1">{clubs.length} klubov celkovo</p>
        </div>
        <Link
          href="/admin/kluby/novy"
          className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#012d74]/90"
        >
          + Nový klub
        </Link>
      </div>

      <div className="rounded overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        {clubs.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[#64748b] mb-2">Žiadne kluby</p>
            <p className="text-xs text-[#94a3b8]">Pridajte prvý klub cez tlačidlo vyššie.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(1,45,116,0.08)]">
                <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Klub</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Mesto</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Predseda</th>
                <th className="px-4 py-3 text-left text-[10px] uppercase tracking-wider text-[#64748b]">Stav</th>
                <th className="px-4 py-3 text-right text-[10px] uppercase tracking-wider text-[#64748b]">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {clubs.map((club: any) => (
                <tr key={club.id} className="border-b border-[rgba(1,45,116,0.08)] hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {club.logo_url ? (
                        <div className="shrink-0" style={{ width: 32, height: 32 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={club.logo_url} alt="" width={32} height={32} style={{ width: 32, height: 32, objectFit: "contain" }} />
                        </div>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-[#64748b] shrink-0">
                          {(club.short_name || club.name).slice(0, 3)}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold text-[#051937]">{club.name}</span>
                        <span className="ml-2 text-xs text-[#94a3b8]">{club.short_name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#64748b]">{club.city || "-"}</td>
                  <td className="px-4 py-3.5 text-[#64748b]">{club.chairman || "-"}</td>
                  <td className="px-4 py-3.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      club.status === "published"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-[#64748b]"
                    }`}>
                      {club.status === "published" ? "Publikovaný" : "Koncept"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/kluby/${club.id}`} className="rounded bg-gray-100 px-3 py-1.5 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors">
                        Upraviť
                      </Link>
                      <DeleteClubButton id={club.id} name={club.name} />
                    </div>
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
