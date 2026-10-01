import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kluby",
  description: "Zoznam klubov pozemného hokeja na Slovensku. Nájdi klub vo svojom meste.",
};

const CLUBS = [
  { name: "KPH Rača", short: "RAC", city: "Bratislava - Rača", lat: 48.2070, lng: 17.1530, logo: "/images/timy/RAC.png", email: "kph.raca@gmail.com", web: "https://kphraca.sk" },
  { name: "Slávia STU Bratislava", short: "SLA", city: "Bratislava", lat: 48.1486, lng: 17.1077, logo: "/images/timy/SLA.png" },
  { name: "HC Slovan Bratislava", short: "BRA", city: "Bratislava", lat: 48.1534, lng: 17.1303, logo: "/images/timy/BRA.jpg" },
  { name: "ŠKP Bratislava", short: "HRA", city: "Bratislava - Petržalka", lat: 48.1120, lng: 17.1180, logo: "/images/timy/HRA.png" },
  { name: "MHC Calex Zlaté Moravce", short: "ZLA", city: "Zlaté Moravce", lat: 48.3873, lng: 18.3968, logo: "/images/timy/ZLA.png", email: "mhczlatemoravce@gmail.com" },
  { name: "MHC Nové Zámky", short: "NOV", city: "Nové Zámky", lat: 47.9857, lng: 18.1623, logo: "/images/timy/NOV.png" },
  { name: "MHC Šenkvice", short: "SEN", city: "Šenkvice", lat: 48.2919, lng: 17.3419, logo: "/images/timy/SEN.png" },
  { name: "HK Apollo Bratislava", short: "AHT", city: "Bratislava", lat: 48.1628, lng: 17.1150, logo: "/images/timy/AHT.png" },
  { name: "HC Trnava", short: "TRO", city: "Trnava", lat: 48.3774, lng: 17.5862, logo: "/images/timy/TRO.jpg" },
  { name: "HC Prešov", short: "PRE", city: "Prešov", lat: 48.9986, lng: 21.2395, logo: "/images/timy/PRE.png" },
  { name: "HC Považská Bystrica", short: "POM", city: "Považská Bystrica", lat: 49.1215, lng: 18.4216, logo: "/images/timy/POM.jpg" },
  { name: "HC Nitra", short: "CAR", city: "Nitra", lat: 48.3060, lng: 18.0855, logo: "/images/timy/CAR.png" },
  { name: "HC Lučenec", short: "LOU", city: "Lučenec", lat: 48.3309, lng: 19.6653, logo: "/images/timy/LOU.jpg" },
  { name: "HC Banská Bystrica", short: "BOL", city: "Banská Bystrica", lat: 48.7358, lng: 19.1461, logo: "/images/timy/BOL.png" },
  { name: "HC Invaders Košice", short: "INV", city: "Košice", lat: 48.7164, lng: 21.2611, logo: "/images/timy/INV.jpg" },
  { name: "HC Partizánske", short: "PAR", city: "Partizánske", lat: 48.6288, lng: 18.3754, logo: "/images/timy/PAR.jpg" },
  { name: "HC Budmerice", short: "BUD", city: "Budmerice", lat: 48.3575, lng: 17.4089, logo: "/images/timy/BUD.png" },
  { name: "HC Nová Dubnica", short: "NOD", city: "Nová Dubnica", lat: 48.9348, lng: 18.1475, logo: "/images/timy/nova-dubnica-32x32.png" },
];

export default function KlubyPage() {
  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="px-6 lg:px-10 xl:px-16 max-w-[1600px] mx-auto pt-8 pb-20">
        <div className="mb-8">
          <h1 className="font-garet font-bold italic text-[#051937]" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)", textTransform: "uppercase" }}>
            Kluby pozemného hokeja
          </h1>
          <p className="text-[#64748b] mt-2" style={{ fontSize: "14px" }}>
            Nájdite klub vo svojom meste a začnite hrať pozemný hokej.
          </p>
        </div>

        {/* Map */}
        <div className="relative w-full overflow-hidden mb-10" style={{ height: "420px", borderRadius: "4px" }}>
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1_placeholder&z=8&ll=48.7,19.0"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Fallback static map image */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #051937 0%, #012d74 100%)" }}>
            <div className="text-center">
              <svg className="h-12 w-12 text-white/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
              </svg>
              <p className="font-garet font-bold text-white" style={{ fontSize: "18px" }}>Mapa klubov</p>
              <p className="text-white/50 mt-1" style={{ fontSize: "12px" }}>{CLUBS.length} klubov po celom Slovensku</p>
            </div>
          </div>
        </div>

        {/* Club grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {CLUBS.map((club) => (
            <div key={club.short} className="bg-white px-5 py-4 flex items-start gap-4" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
              <div className="shrink-0 flex items-center justify-center" style={{ width: 44, height: 44 }}>
                <Image src={club.logo} alt={club.name} width={44} height={44} className="object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#051937] leading-snug" style={{ fontSize: "13px" }}>{club.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <svg className="h-3 w-3 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                  </svg>
                  <span className="text-[#64748b]" style={{ fontSize: "11px" }}>{club.city}</span>
                </div>
                {club.email && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <svg className="h-3 w-3 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a href={`mailto:${club.email}`} className="text-[#012d74] hover:text-[#051937] transition-colors" style={{ fontSize: "11px" }}>{club.email}</a>
                  </div>
                )}
                {club.web && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <svg className="h-3 w-3 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <a href={club.web} target="_blank" rel="noopener noreferrer" className="text-[#012d74] hover:text-[#051937] transition-colors truncate" style={{ fontSize: "11px" }}>{club.web.replace("https://", "")}</a>
                  </div>
                )}
              </div>
            </div>
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
