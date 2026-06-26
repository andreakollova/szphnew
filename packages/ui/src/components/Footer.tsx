import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "./NewsletterForm";

interface FooterProps {
  brand: "fieldhockey" | "szph";
  logoSrc?: string;
}

const FOOTER_LINKS_FIELDHOCKEY = [
  { group: "Obsah", items: [
    { label: "Novinky", href: "/novinky" },
    { label: "Zápasy", href: "/zapasy" },
    { label: "Video", href: "/video" },
  ]},
  { group: "Informácie", items: [
    { label: "O pozemnom hokeji", href: "/o-pozemnom-hokeji" },
    { label: "Slovenská liga", href: "/liga" },
    { label: "Reprezentácia", href: "/reprezentacia" },
  ]},
  { group: "Zväz", items: [
    { label: "szph.sk", href: "https://szph.sk" },
    { label: "Kontakt", href: "/kontakt" },
  ]},
];

const FOOTER_LINKS_SZPH = [
  { group: "Navigácia", items: [
    { label: "Novinky", href: "/novinky" },
    { label: "Zápasy", href: "/zapasy" },
    { label: "Dokumenty", href: "/dokumenty" },
  ]},
  { group: "Pre kluby", items: [
    { label: "Registrácia", href: "/pre-kluby/registracia" },
    { label: "Pravidlá", href: "/pre-kluby/pravidla" },
    { label: "Formuláre", href: "/pre-kluby/formulare" },
  ]},
  { group: "Kontakt", items: [
    { label: "fieldhockey.sk", href: "https://fieldhockey.sk" },
    { label: "Kontakt", href: "/kontakt" },
  ]},
];

export function Footer({ brand, logoSrc = "/images/logo-szph.png" }: FooterProps) {
  const links = brand === "fieldhockey" ? FOOTER_LINKS_FIELDHOCKEY : FOOTER_LINKS_SZPH;
  const isFieldhockey = brand === "fieldhockey";

  return (
    <footer style={{ background: "#f8f9fa", borderTop: "1px solid rgba(1,45,116,0.07)" }}>
      {/* Newsletter bar */}
      <div style={{ background: "#051937" }}>
        <div className="container-szph py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-garet font-bold italic text-white" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", textTransform: "uppercase" }}>
                Odber noviniek
              </p>
              <p className="text-white/40 mt-0.5" style={{ fontSize: "11px" }}>
                Dostávajte najnovšie správy priamo do e-mailu.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-szph py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image src={logoSrc} alt="SZPH" width={160} height={60}
                className="h-14 w-auto object-contain" />
            </div>
            <p className="leading-relaxed max-w-xs text-[#64748b]" style={{ fontSize: "13px" }}>
              {isFieldhockey
                ? "Pozemný hokej je viac ako šport. Príbehy, emócie a komunita slovenského pozemného hokeja."
                : "Slovenský zväz pozemného hokeja — riadiaci orgán pozemného hokeja na Slovensku od roku 1928."}
            </p>
            {/* App badges */}
            <div className="mt-5 flex gap-2 flex-wrap">
              <a href="#" target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/3840px-Download_on_the_App_Store_Badge.svg.png" alt="Download on the App Store" style={{ height: "26px", width: "auto" }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/960px-Google_Play_Store_badge_EN.svg.png" alt="Get it on Google Play" style={{ height: "26px", width: "auto" }} />
              </a>
            </div>

            <div className="mt-4 flex gap-2">
              <a href="https://facebook.com/szph" target="_blank" rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#94a3b8] transition-colors hover:bg-[#e2e8f0] hover:text-[#051937]" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com/szph" target="_blank" rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#94a3b8] transition-colors hover:bg-[#e2e8f0] hover:text-[#051937]" aria-label="Instagram">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://youtube.com/@szph" target="_blank" rel="noopener noreferrer"
                className="rounded-lg p-2 text-[#94a3b8] transition-colors hover:bg-[#e2e8f0] hover:text-[#051937]" aria-label="YouTube">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z"/>
                  <path fill="#f8f9fa" d="M9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                </svg>
              </a>
            </div>
          </div>

          {links.map(group => (
            <div key={group.group}>
              <h4 className="font-garet font-bold italic text-[#051937] mb-4" style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{group.group}</h4>
              <ul className="space-y-2.5">
                {group.items.map(item => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[#64748b] transition-colors hover:text-[#051937]" style={{ fontSize: "13px" }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 pt-6 text-xs text-[#94a3b8] sm:flex-row sm:justify-between" style={{ borderTop: "1px solid rgba(1,45,116,0.07)" }}>
          <p>© {new Date().getFullYear()} Slovenský zväz pozemného hokeja</p>
          <p className="flex gap-3">
            <Link href="/ochrana-osobnych-udajov" className="hover:text-[#051937] transition-colors">Ochrana osobných údajov</Link>
            <span style={{ color: "rgba(1,45,116,0.2)" }}>·</span>
            <Link href="/cookies" className="hover:text-[#051937] transition-colors">Cookies</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
