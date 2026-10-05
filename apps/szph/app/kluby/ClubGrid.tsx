"use client";

import { useState } from "react";
import { ClubCard } from "./ClubCard";

interface Club {
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

export function ClubGrid({ clubs }: { clubs: Club[] }) {
  const [allExpanded, setAllExpanded] = useState(false);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {clubs.map((club) => (
        <ClubCard
          key={club.id}
          club={club}
          expanded={allExpanded}
          onToggle={() => setAllExpanded(!allExpanded)}
        />
      ))}
    </div>
  );
}
