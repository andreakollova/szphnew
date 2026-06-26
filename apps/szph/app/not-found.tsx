import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-garet text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-white/50 mb-8">Stránka nebola nájdená.</p>
      <Link
        href="/"
        className="rounded-xl bg-[var(--sky)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--sky-light)] transition-all"
      >
        Späť na úvod
      </Link>
    </div>
  );
}
