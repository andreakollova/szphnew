"use client";

import { useState, useEffect } from "react";
import { createBrowserSupabaseClient } from "@szph/db/client";
import Image from "next/image";

interface BannerItem {
  id: string;
  image_url: string;
  mobile_pos_x: number;
  mobile_pos_y: number;
  desktop_pos_x: number;
  desktop_pos_y: number;
  sort_order: number;
}

export default function AdminBannerPage() {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createBrowserSupabaseClient();

  async function load() {
    const { data } = await supabase.from("hero_banners").select("*").order("sort_order");
    if (data && data.length > 0) {
      setBanners(data as BannerItem[]);
    } else {
      // Seed defaults if empty
      const defaults: Omit<BannerItem, "id">[] = [
        { image_url: "/images/hero-banner3.webp", mobile_pos_x: 50, mobile_pos_y: 25, desktop_pos_x: 50, desktop_pos_y: 25, sort_order: 0 },
        { image_url: "/images/hero-banner3b.webp", mobile_pos_x: 65, mobile_pos_y: 30, desktop_pos_x: 50, desktop_pos_y: 55, sort_order: 1 },
        { image_url: "/images/hero-banner7.webp", mobile_pos_x: 65, mobile_pos_y: 30, desktop_pos_x: 50, desktop_pos_y: 55, sort_order: 2 },
        { image_url: "/images/hero-banner-blue-player.webp", mobile_pos_x: 35, mobile_pos_y: 10, desktop_pos_x: 50, desktop_pos_y: 0, sort_order: 3 },
        { image_url: "/images/hero-banner2.webp", mobile_pos_x: 50, mobile_pos_y: 25, desktop_pos_x: 50, desktop_pos_y: 25, sort_order: 4 },
      ];
      const { data: seeded } = await supabase.from("hero_banners").insert(defaults).select();
      if (seeded) setBanners(seeded as BannerItem[]);
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleSaveAll() {
    setSaving(true);
    for (const b of banners) {
      await supabase.from("hero_banners").update({
        mobile_pos_x: b.mobile_pos_x,
        mobile_pos_y: b.mobile_pos_y,
        desktop_pos_x: b.desktop_pos_x,
        desktop_pos_y: b.desktop_pos_y,
        sort_order: b.sort_order,
      }).eq("id", b.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleUpload(file: File) {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `hero-${Date.now()}.${ext}`;
    const { data } = await supabase.storage.from("hero-banners").upload(path, file, { upsert: true });
    if (data) {
      const url = supabase.storage.from("hero-banners").getPublicUrl(data.path).data.publicUrl;
      const newOrder = banners.length;
      const { data: inserted } = await supabase.from("hero_banners").insert({
        image_url: url,
        mobile_pos_x: 50, mobile_pos_y: 50,
        desktop_pos_x: 50, desktop_pos_y: 50,
        sort_order: newOrder,
      }).select().single();
      if (inserted) setBanners([...banners, inserted as BannerItem]);
    }
    setUploading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Zmazat tento banner?")) return;
    await supabase.from("hero_banners").delete().eq("id", id);
    setBanners(banners.filter(b => b.id !== id));
  }

  function moveUp(idx: number) {
    if (idx === 0) return;
    const next = [...banners];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    next.forEach((b, i) => b.sort_order = i);
    setBanners(next);
  }

  function moveDown(idx: number) {
    if (idx >= banners.length - 1) return;
    const next = [...banners];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    next.forEach((b, i) => b.sort_order = i);
    setBanners(next);
  }

  function updatePos(id: string, key: keyof BannerItem, value: number) {
    setBanners(banners.map(b => b.id === id ? { ...b, [key]: value } : b));
  }

  const labelCls = "block text-[9px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-1";

  if (loading) return <div className="text-[#64748b] p-8">Nacitavam...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#051937]">Hlavny banner</h1>
          <p className="text-sm text-[#64748b] mt-1">{banners.length} fotiek v rotacii</p>
        </div>
        <div className="flex gap-2">
          <label className="inline-flex items-center gap-2 rounded bg-[#012d74] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#012d74]/90 transition-all cursor-pointer">
            {uploading ? "Nahravam..." : "+ Pridat fotku"}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} disabled={uploading} />
          </label>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="rounded bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            {saving ? "Ukladam..." : "Ulozit zmeny"}
          </button>
        </div>
      </div>

      {saved && (
        <div className="rounded bg-emerald-500/15 border border-emerald-500/25 px-4 py-3 text-sm text-emerald-600 font-semibold">
          Zmeny ulozene
        </div>
      )}

      <div className="space-y-4">
        {banners.map((banner, idx) => (
          <div key={banner.id} className="rounded p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <div className="flex gap-5">
              {/* Preview */}
              <div className="shrink-0">
                <div className="relative overflow-hidden rounded" style={{ width: 180, height: 120 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={banner.image_url}
                    alt={`Banner ${idx + 1}`}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: `${banner.desktop_pos_x}% ${banner.desktop_pos_y}%` }}
                  />
                </div>
                <p className="text-center text-[#94a3b8] font-bold mt-1.5" style={{ fontSize: "10px" }}>
                  Desktop pozicia
                </p>
                {/* Mobile preview */}
                <div className="relative overflow-hidden rounded mt-2" style={{ width: 70, height: 120, margin: "0 auto" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={banner.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ objectPosition: `${banner.mobile_pos_x}% ${banner.mobile_pos_y}%` }}
                  />
                </div>
                <p className="text-center text-[#94a3b8] font-bold mt-1" style={{ fontSize: "10px" }}>
                  Mobile pozicia
                </p>
              </div>

              {/* Controls */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-[#051937]" style={{ fontSize: "14px" }}>
                    Banner #{idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveUp(idx)} disabled={idx === 0} className="rounded p-1.5 hover:bg-gray-100 disabled:opacity-20 transition-colors" title="Posun hore">
                      <svg className="h-4 w-4 text-[#051937]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button onClick={() => moveDown(idx)} disabled={idx >= banners.length - 1} className="rounded p-1.5 hover:bg-gray-100 disabled:opacity-20 transition-colors" title="Posun dole">
                      <svg className="h-4 w-4 text-[#051937]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <button onClick={() => handleDelete(banner.id)} className="rounded p-1.5 hover:bg-red-50 transition-colors ml-2" title="Zmazat">
                      <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Desktop position */}
                  <div className="p-3 rounded" style={{ background: "#f8f9fa" }}>
                    <p className="font-bold text-[#051937] mb-3" style={{ fontSize: "11px" }}>Desktop</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className={labelCls}>Dolava / Doprava</label>
                          <span className="text-[9px] font-bold text-[#012d74]">{banner.desktop_pos_x}%</span>
                        </div>
                        <input type="range" min={0} max={100} value={banner.desktop_pos_x} onChange={(e) => updatePos(banner.id, "desktop_pos_x", +e.target.value)} className="w-full accent-[#012d74]" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label className={labelCls}>Hore / Dole</label>
                          <span className="text-[9px] font-bold text-[#012d74]">{banner.desktop_pos_y}%</span>
                        </div>
                        <input type="range" min={0} max={100} value={banner.desktop_pos_y} onChange={(e) => updatePos(banner.id, "desktop_pos_y", +e.target.value)} className="w-full accent-[#012d74]" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile position */}
                  <div className="p-3 rounded" style={{ background: "#f8f9fa" }}>
                    <p className="font-bold text-[#051937] mb-3" style={{ fontSize: "11px" }}>Mobile</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <label className={labelCls}>Dolava / Doprava</label>
                          <span className="text-[9px] font-bold text-[#012d74]">{banner.mobile_pos_x}%</span>
                        </div>
                        <input type="range" min={0} max={100} value={banner.mobile_pos_x} onChange={(e) => updatePos(banner.id, "mobile_pos_x", +e.target.value)} className="w-full accent-[#012d74]" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between">
                          <label className={labelCls}>Hore / Dole</label>
                          <span className="text-[9px] font-bold text-[#012d74]">{banner.mobile_pos_y}%</span>
                        </div>
                        <input type="range" min={0} max={100} value={banner.mobile_pos_y} onChange={(e) => updatePos(banner.id, "mobile_pos_y", +e.target.value)} className="w-full accent-[#012d74]" />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-[#94a3b8] mt-2 truncate" style={{ fontSize: "10px" }}>{banner.image_url}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="rounded py-16 text-center" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
          <p className="text-[#64748b]">Ziadne bannery. Pridajte prvu fotku.</p>
        </div>
      )}
    </div>
  );
}
