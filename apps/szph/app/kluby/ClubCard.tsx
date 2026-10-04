"use client";

import Image from "next/image";
import { useState } from "react";

interface ClubProps {
  id: string;
  name: string;
  short_name: string;
  city: string;
  phone: string | null;
  email: string | null;
  web: string | null;
  facebook: string | null;
  logo_url: string | null;
  address: string | null;
  ico: string | null;
  chairman: string | null;
  account: string | null;
}

export function ClubCard({ club }: { club: ClubProps }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white flex flex-col" style={{ borderRadius: "3px", border: "1px solid rgba(1,45,116,0.06)" }}>
      <div className="px-5 py-5 flex flex-col items-center text-center">
        <div className="flex items-center justify-center mb-3" style={{ width: 56, height: 56 }}>
          {club.logo_url && (
            <Image src={club.logo_url} alt={club.name} width={56} height={56} className="object-contain" />
          )}
        </div>
        <h3 className="font-bold text-[#051937] leading-snug" style={{ fontSize: "13px" }}>{club.name}</h3>
        <div className="flex items-center gap-1.5 mt-2">
          <svg className="h-3 w-3 text-[#94a3b8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
          </svg>
          <span className="text-[#64748b]" style={{ fontSize: "11px" }}>{club.city}</span>
        </div>
        {club.email && (
          <a href={`mailto:${club.email}`} className="text-[#012d74] hover:text-[#051937] transition-colors mt-1 truncate max-w-full" style={{ fontSize: "10px" }}>{club.email}</a>
        )}
        {club.phone && (
          <span className="text-[#64748b] mt-0.5" style={{ fontSize: "10px" }}>{club.phone}</span>
        )}
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
          {club.address && (
            <div className="pt-3">
              <p className="text-[#94a3b8] font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Adresa</p>
              <p className="text-[#334155]" style={{ fontSize: "11px" }}>{club.address}</p>
            </div>
          )}
          {club.chairman && (
            <div>
              <p className="text-[#94a3b8] font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Predseda</p>
              <p className="text-[#334155]" style={{ fontSize: "11px" }}>{club.chairman}</p>
            </div>
          )}
          {club.ico && (
            <div>
              <p className="text-[#94a3b8] font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>ICO</p>
              <p className="text-[#334155]" style={{ fontSize: "11px" }}>{club.ico}</p>
            </div>
          )}
          {club.account && (
            <div>
              <p className="text-[#94a3b8] font-bold uppercase" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>Dotacny ucet</p>
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
