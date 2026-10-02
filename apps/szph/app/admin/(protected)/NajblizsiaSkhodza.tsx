"use client";

function getNextFirstWednesday(): Date {
  const now = new Date();
  let d = new Date(now.getFullYear(), now.getMonth(), 1);

  // Find first Wednesday of current month
  while (d.getDay() !== 3) {
    d.setDate(d.getDate() + 1);
  }

  // If it's already past, get next month's first Wednesday
  if (d < now) {
    d = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    while (d.getDay() !== 3) {
      d.setDate(d.getDate() + 1);
    }
  }

  return d;
}

function daysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function NajblizsiaSkhodza() {
  const next = getNextFirstWednesday();
  const days = daysUntil(next);
  const dateStr = next.toLocaleDateString("sk-SK", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="rounded-md p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
      <div className="flex items-center gap-2 mb-3">
        <svg className="h-4 w-4 text-[#012d74]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <h2 className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>Najbližšia schôdza</h2>
      </div>
      <p className="font-semibold text-[#051937] capitalize" style={{ fontSize: "13px" }}>{dateStr}</p>
      <p className="text-[#64748b] mt-0.5" style={{ fontSize: "11px" }}>
        Prvá streda v mesiaci · {days === 0 ? "Dnes!" : days === 1 ? "Zajtra" : `Za ${days} dní`}
      </p>
      {days <= 3 && (
        <div className="mt-2 rounded-md bg-[#012d74]/5 px-3 py-1.5">
          <span className="font-bold text-[#012d74]" style={{ fontSize: "10px" }}>Blíži sa schôdza!</span>
        </div>
      )}
    </div>
  );
}
