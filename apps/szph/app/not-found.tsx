import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6" style={{ background: "#f8f9fa" }}>
      <p className="font-garet font-bold italic text-[#051937] mb-2" style={{ fontSize: "72px", lineHeight: 1 }}>404</p>
      <p className="text-[#64748b] mb-6" style={{ fontSize: "15px" }}>Hmm, nenašli sme čo hľadáš.</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-bold text-white px-5 py-2.5 transition-all hover:opacity-90"
        style={{ background: "#051937", borderRadius: "6px", fontSize: "11px", letterSpacing: "0.06em" }}
      >
        Späť na domov
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}
