import type { Metadata } from "next";
import { EvidenciaClient } from "./EvidenciaClient";

export const metadata: Metadata = {
  title: "Evidencia klubov",
  description: "Prehľad klubov pozemného hokeja na Slovensku",
};

const SPREADSHEET_ID = "1Cu0iB8YOphJDD2D2n-CWhYYZJfAuJnhZ";

const CLUBS = [
  {
    sheetName: "KPH RACA",
    name: "KPH Rača",
    city: "Bratislava - Rača",
    lat: 48.2089,
    lng: 17.1547,
  },
  {
    sheetName: "SK SENKVICE",
    name: "SK Šenkvice",
    city: "Šenkvice",
    lat: 48.2933,
    lng: 17.35,
  },
  {
    sheetName: "HAS SENKVICE",
    name: "HAS Šenkvice",
    city: "Šenkvice",
    lat: 48.296,
    lng: 17.353,
  },
  {
    sheetName: "HOKO ZLATE MORAVCE",
    name: "HOKO Zlaté Moravce",
    city: "Zlaté Moravce",
    lat: 48.3833,
    lng: 18.4,
  },
  {
    sheetName: "HK NOVA DUBNICA",
    name: "HK Nová Dubnica",
    city: "Nová Dubnica",
    lat: 48.9417,
    lng: 18.15,
  },
];

type Member = {
  club: string;
  meno: string;
  priezvisko: string;
  rokNarodenia: number | null;
  pohlavie: string;
  stav: string;
};

async function fetchSheetCSV(sheetName: string): Promise<string> {
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return "";
  return res.text();
}

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < csv.length; i++) {
    const ch = csv[i];
    if (inQuotes) {
      if (ch === '"' && csv[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(current.trim());
        current = "";
      } else if (ch === "\n" || (ch === "\r" && csv[i + 1] === "\n")) {
        row.push(current.trim());
        current = "";
        rows.push(row);
        row = [];
        if (ch === "\r") i++;
      } else {
        current += ch;
      }
    }
  }
  if (current || row.length) {
    row.push(current.trim());
    rows.push(row);
  }
  return rows;
}

function parseMembers(csv: string, clubName: string): Member[] {
  if (!csv) return [];
  const rows = parseCSV(csv);
  // gviz CSV: row 0 = header (Poradie, Meno, ...), row 1+ = data
  const members: Member[] = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const meno = r[1]?.trim();
    if (!meno) continue;
    members.push({
      club: clubName,
      meno,
      priezvisko: r[2]?.trim() || "",
      rokNarodenia: r[3] ? parseInt(r[3]) || null : null,
      pohlavie: r[5]?.trim() || "",
      stav: r[6]?.trim() || "",
    });
  }
  return members;
}

export default async function EvidenciaPage() {
  const results = await Promise.allSettled(
    CLUBS.map(async (club) => {
      const csv = await fetchSheetCSV(club.sheetName);
      return {
        ...club,
        members: parseMembers(csv, club.name),
      };
    })
  );

  const clubsData = results.map((r, i) => {
    if (r.status === "fulfilled") return r.value;
    return { ...CLUBS[i], members: [] as Member[] };
  });

  return <EvidenciaClient clubs={clubsData} />;
}
