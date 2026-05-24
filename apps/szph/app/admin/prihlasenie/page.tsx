"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createBrowserSupabaseClient } from "@szph/db/client";
import { GlassCard } from "@szph/ui";

export default function PrihlaseniePage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [loading, setLoading]   = useState(false);

  const supabase = createBrowserSupabaseClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Nesprávny email alebo heslo.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Image
            src="/images/logo-szph.png"
            alt="SZPH"
            width={120}
            height={46}
            className="h-12 w-auto mx-auto object-contain"
          />
          <p className="mt-3 text-sm text-white/40">Admin panel</p>
        </div>

        <GlassCard className="p-8" hover={false}>
          <h1 className="font-garet text-xl font-bold text-white mb-6">Prihlásenie</h1>

          {error && (
            <div className="mb-4 rounded-xl bg-red-500/15 border border-red-500/25 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[var(--sky)]/60 focus:bg-white/12"
                placeholder="admin@szph.sk"
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
                className="w-full rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[var(--sky)]/60 focus:bg-white/12"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[var(--sky)] py-3 text-sm font-bold text-white transition-all hover:bg-[var(--sky-light)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Prihlasovanie..." : "Prihlásiť sa"}
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
