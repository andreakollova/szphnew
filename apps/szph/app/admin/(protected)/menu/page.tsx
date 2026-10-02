import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Menu" };

const CURRENT_MENU = [
  { label: "Pozemný hokej", href: "/pozemny-hokej", hasSubmenu: true },
  { label: "Reprezentácia", href: "/reprezentacia", hasSubmenu: true },
  { label: "Súťaže", href: "/sutaze", hasSubmenu: true },
  { label: "Kluby", href: "/kluby", hasSubmenu: true },
  { label: "Vzdelávanie", href: "/vzdelavanie", hasSubmenu: true },
  { label: "E-shop", href: "/eshop", hasSubmenu: false },
  { label: "Kontakt", href: "/kontakt", hasSubmenu: false },
];

export default function AdminMenuPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#051937]">Menu</h1>
        <p className="text-sm text-[#64748b] mt-1">Prehľad položiek hlavného menu</p>
      </div>

      <div className="rounded p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <div className="space-y-1">
          {CURRENT_MENU.map((item, i) => (
            <div key={item.href} className="flex items-center gap-3 rounded p-3 hover:bg-gray-50 transition-colors">
              <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#012d74]/10 text-[#012d74] font-bold" style={{ fontSize: "10px" }}>{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#051937]" style={{ fontSize: "14px" }}>{item.label}</p>
                <p className="text-[#94a3b8]" style={{ fontSize: "11px" }}>{item.href}</p>
              </div>
              {item.hasSubmenu && (
                <span className="rounded-full px-2 py-0.5 text-[8px] font-bold uppercase" style={{ background: "rgba(1,45,116,0.06)", color: "#012d74" }}>Mega menu</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
        <h2 className="font-bold text-[#051937] mb-3" style={{ fontSize: "14px" }}>Úprava menu</h2>
        <p className="text-[#64748b] mb-4" style={{ fontSize: "13px" }}>
          Hlavné menu a mega menu podstránky sú momentálne spravované v kóde. Pre zmeny v menu kontaktujte administrátora.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/admin/stranky" className="rounded p-3 text-center font-semibold text-[#012d74] hover:bg-[#012d74]/5 transition-colors" style={{ fontSize: "12px", border: "1px solid rgba(1,45,116,0.1)" }}>
            Spravovať stránky
          </Link>
          <Link href="/admin/clanky" className="rounded p-3 text-center font-semibold text-[#012d74] hover:bg-[#012d74]/5 transition-colors" style={{ fontSize: "12px", border: "1px solid rgba(1,45,116,0.1)" }}>
            Spravovať články
          </Link>
        </div>
      </div>
    </div>
  );
}
