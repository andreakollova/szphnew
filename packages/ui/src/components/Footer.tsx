import Link from "next/link";
import Image from "next/image";

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
    <footer className="relative mt-24 border-t border-white/10">
      {/* Diagonálny rez hore */}
      <div
        className="absolute -top-12 inset-x-0 h-12 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(10,14,26,0.5))"
        }}
      />

      <div className="glass-dark">
        <div className="container-szph py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand kolumna */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <Image
                  src={logoSrc}
                  alt="SZPH"
                  width={120}
                  height={45}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                {isFieldhockey
                  ? "Pozemný hokej je viac ako šport. Príbehy, emócie a komunita slovenského pozemného hokeja."
                  : "Slovenský zväz pozemného hokeja — riadiaci orgán pozemného hokeja na Slovensku."}
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://facebook.com/szph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/szph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Link skupiny */}
            {links.map((group) => (
              <div key={group.group}>
                <h4 className="label-wide mb-4 text-white/50">{group.group}</h4>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-center text-xs text-white/30 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} Slovenský zväz pozemného hokeja</p>
            <p>
              <Link href="/ochrana-osobnych-udajov" className="hover:text-white/60">
                Ochrana osobných údajov
              </Link>
              {" · "}
              <Link href="/cookies" className="hover:text-white/60">
                Cookies
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
