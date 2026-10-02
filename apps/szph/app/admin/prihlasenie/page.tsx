"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Nesprávne meno alebo heslo.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4 relative">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="absolute left-4 top-4 flex items-center gap-1.5 text-white/40 hover:text-white transition-colors"
        style={{ top: "calc(env(safe-area-inset-top, 16px) + 12px)" }}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-semibold">Späť</span>
      </button>

      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/images/logo-szph-white.webp"
            alt="SZPH"
            width={120}
            height={46}
            className="h-12 w-auto mx-auto object-contain"
          />
          <p className="mt-3 text-sm text-white/40">Admin panel</p>
        </div>

        <div className="rounded p-8" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <h1 className="text-xl font-bold text-white mb-6">Prihlásenie</h1>

          {error && (
            <div className="mb-4 rounded bg-red-500/15 border border-red-500/25 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                Meno
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-500/60 focus:bg-white/8"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                Heslo
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-blue-500/60 focus:bg-white/8"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-[#012d74] py-3 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Prihlasovanie..." : "Prihlásiť sa"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
