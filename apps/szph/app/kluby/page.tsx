"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CLUBS = [
  {
    name: "KPH Rača",
    short: "RAČ",
    city: "Bratislava",
    phone: "0903 714 909",
    email: "kphraca@kphraca.sk",
    web: "https://www.kphraca.sk",
    facebook: "KPH Rača Bratislava",
    logo: "/images/timy/Raca-logo-70x58-1-32x27.webp",
    address: "Jurkovičova 5, 831 06 Bratislava",
    ico: "31795773",
    chairman: "Ing. Peter Romanec",
    account: "SK27310000000040700062032",
  },
  {
    name: "HC 1952 Šenkvice",
    short: "ŠEN",
    city: "Šenkvice",
    phone: "0903 754 769",
    email: "pozemnyhokej1952@gmail.com",
    web: "https://hockeysenkvice.sk/",
    facebook: "HC 1952 Šenkvice – field hockey team",
    logo: "/images/timy/SEN.webp",
    address: "Domovina 55, 900 81 Šenkvice",
    ico: "55935842",
    chairman: "Milan Dugovič",
    account: "SK2209000000000019187856",
  },
  {
    name: "HA Šenkvice",
    short: "HAŠ",
    city: "Šenkvice",
    phone: "0908 777 623",
    email: "has@hockeysenkvice.sk",
    web: "https://hockeysenkvice.sk/",
    facebook: "Hokejová Akadémia Šenkvice",
    logo: "/images/timy/HAS.webp",
    address: "Domovina 55, 900 81 Šenkvice",
    ico: "34004106",
    chairman: "Zuzana Krajčírová",
  },
  {
    name: "HKM Nová Dubnica",
    short: "HKM",
    city: "Nová Dubnica",
    phone: "0910 928 292",
    email: "hkmnovadubnica@gmail.com",
    web: "https://www.hkmnovadubnica.sk/",
    facebook: "HKM Nová Dubnica",
    logo: "/images/timy/nova-dubnica-32x32.webp",
    address: "P. O. Hviezdoslava 14/2, 018 51 Nová Dubnica",
    ico: "37917099",
    chairman: "Ing. Zuzana Hoštáková",
    account: "SK49 0200 0000 0023 3304 6751",
  },
  {
    name: "KPH HOKO Zlaté Moravce",
    short: "HOKO",
    city: "Zlaté Moravce",
    phone: "0903 915 108",
    email: "kph.hoko@gmail.com",
    facebook: "KPH HOKO Zlaté Moravce",
    logo: "/images/timy/logo-KPH-HOKO-1-Photoroom-32x18.webp",
    address: "Továrenská 39, 953 01 Zlaté Moravce",
    ico: "37854887",
    chairman: "Zuzana Jakabová",
    account: "SK07 0900 0000 0002 3223 0972",
  },
];

function ClubCard({ club }: { club: typeof CLUBS[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white flex flex-col" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
      <div className="px-5 py-5 flex flex-col items-center text-center">
        <div className="flex items-center justify-center mb-3" style={{ width: 56, height: 56 }}>
          <Image src={club.logo} alt={club.name} width={56} height={56} className="object-contain" />
        </div>
        <h3 className="font-bold text-[#051937] leading-snug" style={{ fontSize: "13px" }}>{club.name}</h3>
        <div className="flex items-center gap-1.5 mt-2">
          <svg className="h-3 w-3 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
          </svg>
          <span className="text-[#64748b]" style={{ fontSize: "11px" }}>{club.city}</span>
        </div>
        <a href={`mailto:${club.email}`} className="text-[#012d74] hover:text-[#051937] transition-colors mt-1 truncate max-w-full" style={{ fontSize: "10px" }}>{club.email}</a>
        <span className="text-[#64748b] mt-0.5" style={{ fontSize: "10px" }}>{club.phone}</span>
        {club.web && (
          <a href={club.web} target="_blank" rel="noopener noreferrer" className="text-[#012d74] hover:text-[#051937] transition-colors mt-0.5 truncate max-w-full" style={{ fontSize: "10px" }}>
            {club.web.replace("https://", "").replace(/\/$/, "")}
          </a>
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-auto flex items-center justify-center gap-1.5 py-3 font-bold text-[#012d74] hover:bg-[#f0f4fa] transition-colors"
        style={{ fontSize: "10px", borderTop: "1px solid rgba(1,45,116,0.06)" }}
      >
        {expanded ? "Skryť" : "Viac info"}
        <svg className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-2" style={{ borderTop: "1px solid rgba(1,45,116,0.06)" }}>
          <div className="pt-3">
            <p className="text-[#94a3b8] font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Adresa</p>
            <p className="text-[#334155]" style={{ fontSize: "11px" }}>{club.address}</p>
          </div>
          <div>
            <p className="text-[#94a3b8] font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Predseda</p>
            <p className="text-[#334155]" style={{ fontSize: "11px" }}>{club.chairman}</p>
          </div>
          <div>
            <p className="text-[#94a3b8] font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>IČO</p>
            <p className="text-[#334155]" style={{ fontSize: "11px" }}>{club.ico}</p>
          </div>
          {club.account && (
            <div>
              <p className="text-[#94a3b8] font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Dotačný účet</p>
              <p className="text-[#334155] font-mono" style={{ fontSize: "10px" }}>{club.account}</p>
            </div>
          )}
          {club.facebook && (
            <div>
              <p className="text-[#94a3b8] font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Facebook</p>
              <p className="text-[#334155]" style={{ fontSize: "11px" }}>{club.facebook}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function KlubyPage() {
  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-4 sm:px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-8 pb-20">
        <div className="mb-8">
          <h1 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
            Kluby pozemného hokeja
          </h1>
          <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>
            Nájdite klub vo svojom meste a začnite hrať pozemný hokej.
          </p>
        </div>

        {/* Club grid — 5 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CLUBS.map((club) => (
            <ClubCard key={club.short} club={club} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 text-center" style={{ background: "#fff", borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
          <p className="font-garet font-bold text-[#051937] mb-2" style={{ fontSize: "18px" }}>Nenašli ste svoj klub?</p>
          <p className="text-[#64748b] mb-4" style={{ fontSize: "13px" }}>Založte si vlastný klub pozemného hokeja vo vašom meste.</p>
          <Link href="/pre-kluby/zalozenie" className="inline-flex items-center gap-2 font-bold text-white transition-all hover:brightness-110" style={{ background: "#012d74", borderRadius: "20px", padding: "10px 24px", fontSize: "12px" }}>
            Chcem si založiť klub
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
