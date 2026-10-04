"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@szph/db/client";
import { slugify } from "@szph/ui";
import { optimizeImage } from "../../utils/optimizeImage";
import type { Product } from "@szph/db/types";

const CATEGORIES = [
  { value: "mikiny", label: "Mikiny" },
  { value: "tricka", label: "Tričká" },
  { value: "polokosele", label: "Polokošele" },
  { value: "bundy", label: "Bundy" },
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

interface EditProductFormProps {
  product?: Product;
}

export function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Form fields
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [category, setCategory] = useState(product?.category ?? "mikiny");
  const [customCategory, setCustomCategory] = useState("");
  const [useCustomCategory, setUseCustomCategory] = useState(
    product ? !CATEGORIES.some((c) => c.value === product.category) : false
  );
  const [badge, setBadge] = useState(product?.badge ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? ["S", "M", "L", "XL"]);
  const [status, setStatus] = useState<"published" | "draft">(product?.status ?? "draft");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [sortOrder, setSortOrder] = useState(product?.sort_order?.toString() ?? "0");

  // Image upload
  const [uploading, setUploading] = useState(false);

  function handleNameChange(value: string) {
    setName(value);
    if (!product) {
      setSlug(slugify(value));
    }
  }

  function toggleSize(size: string) {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const { blob, filename } = await optimizeImage(file);
        const path = `${Date.now()}-${filename}`;

        const { data, error: uploadError } = await supabase.storage
          .from("products")
          .upload(path, blob, {
            cacheControl: "3600",
            upsert: false,
            contentType: "image/webp",
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(data.path);

        newUrls.push(publicUrl);
      }

      setImages((prev) => [...prev, ...newUrls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chyba pri nahrávaní obrázka");
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    // Validation
    if (!name.trim()) {
      setError("Názov je povinný");
      setSaving(false);
      return;
    }
    if (!slug.trim()) {
      setError("Slug je povinný");
      setSaving(false);
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError("Cena musí byť kladné číslo");
      setSaving(false);
      return;
    }

    const finalCategory = useCustomCategory ? customCategory.trim() : category;
    if (!finalCategory) {
      setError("Kategória je povinná");
      setSaving(false);
      return;
    }

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      price: Number(Number(price).toFixed(2)),
      category: finalCategory,
      images,
      description: description.trim() || null,
      badge: badge.trim() || null,
      sizes: sizes.length > 0 ? sizes : null,
      status,
      sort_order: Number(sortOrder) || 0,
      updated_at: new Date().toISOString(),
    };

    try {
      if (product) {
        const { error: dbErr } = await supabase
          .from("products")
          .update(payload)
          .eq("id", product.id);
        if (dbErr) throw new Error(dbErr.message);

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const { error: dbErr } = await supabase.from("products").insert(payload);
        if (dbErr) throw new Error(dbErr.message);
        router.push("/admin/eshop");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nastala chyba");
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[rgba(1,45,116,0.15)] bg-white px-4 py-2.5 text-sm text-[#051937] outline-none focus:border-[#012d74]/50 transition-all placeholder-[#94a3b8]";
  const labelCls =
    "block text-[10px] font-semibold uppercase tracking-wider text-[#64748b] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {saved && (
        <div className="rounded bg-emerald-500/15 border border-emerald-500/25 px-4 py-3 text-sm text-emerald-600 font-semibold">
          Zmeny uložené.
        </div>
      )}
      {error && (
        <div className="rounded bg-red-500/15 border border-red-500/25 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Hlavný obsah */}
        <div className="space-y-5 lg:col-span-2">
          {/* Základné údaje */}
          <div
            className="rounded p-6"
            style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
          >
            <h2 className="font-bold text-[#051937] mb-4">Základné údaje</h2>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Názov *</label>
                <input
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className={inputCls}
                  placeholder="Názov produktu..."
                />
              </div>

              <div>
                <label className={labelCls}>URL slug</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={`${inputCls} font-mono text-xs`}
                  placeholder="url-produktu"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Cena (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={inputCls}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className={labelCls}>Poradie</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={inputCls}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Popis</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder="Popis produktu (voliteľný)..."
                />
              </div>
            </div>
          </div>

          {/* Obrázky */}
          <div
            className="rounded p-6"
            style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
          >
            <h2 className="font-bold text-[#051937] mb-4">Obrázky</h2>

            {/* Current images */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {images.map((url, index) => (
                  <div key={index} className="relative rounded overflow-hidden" style={{ aspectRatio: "1", background: "#f7f7f9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Obrázok ${index + 1}`}
                      className="h-full w-full object-contain p-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute right-1 top-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white hover:bg-black/80 transition-colors"
                    >
                      Odstrániť
                    </button>
                    {index === 0 && (
                      <span className="absolute left-1 bottom-1 rounded bg-[#012d74] px-1.5 py-0.5 text-[9px] text-white font-semibold">
                        Hlavný
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full text-sm text-[#64748b] file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#051937] hover:file:bg-gray-200 disabled:opacity-50"
              />
              {uploading && (
                <p className="text-xs text-[#012d74] mt-2 font-semibold">Nahrávam obrázky...</p>
              )}
              <p className="text-[10px] text-[#94a3b8] mt-1.5">
                Obrázky sa automaticky optimalizujú na WebP. Prvý obrázok je hlavný.
              </p>
            </div>

            {/* Manual URL */}
            <div className="mt-4">
              <label className={labelCls}>Alebo pridaj URL obrázka</label>
              <div className="flex gap-2">
                <input
                  id="manual-image-url"
                  className={inputCls}
                  placeholder="https://..."
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById("manual-image-url") as HTMLInputElement;
                    if (input.value.trim()) {
                      setImages((prev) => [...prev, input.value.trim()]);
                      input.value = "";
                    }
                  }}
                  className="shrink-0 rounded bg-gray-100 px-4 py-2 text-xs font-semibold text-[#051937] hover:bg-gray-200 transition-colors"
                >
                  Pridať
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Postranný panel */}
        <div className="space-y-4">
          <div
            className="rounded p-5"
            style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}
          >
            <h2 className="font-bold text-[#051937] mb-4">Nastavenia</h2>
            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className={labelCls}>Stav</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "published" | "draft")}
                  className={inputCls}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Publikovaný</option>
                </select>
              </div>

              {/* Kategória */}
              <div>
                <label className={labelCls}>Kategória *</label>
                {!useCustomCategory ? (
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputCls}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className={inputCls}
                    placeholder="Vlastná kategória..."
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    setUseCustomCategory(!useCustomCategory);
                    if (!useCustomCategory && product) {
                      setCustomCategory(product.category);
                    }
                  }}
                  className="mt-1 text-[10px] text-[#012d74] font-semibold hover:underline"
                >
                  {useCustomCategory ? "Použiť predvolené" : "Vlastná kategória"}
                </button>
              </div>

              {/* Badge */}
              <div>
                <label className={labelCls}>Badge (voliteľné)</label>
                <input
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className={inputCls}
                  placeholder="Novinka, Limitovaná edícia..."
                />
              </div>

              {/* Veľkosti */}
              <div>
                <label className={labelCls}>Veľkosti</label>
                <div className="flex flex-wrap gap-2">
                  {ALL_SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`rounded px-3 py-1.5 text-xs font-semibold transition-all ${
                        sizes.includes(size)
                          ? "bg-[#012d74] text-white"
                          : "bg-gray-100 text-[#64748b] hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Akcie */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded bg-[#012d74] py-3 text-sm font-bold text-white transition-all hover:bg-[#012d74]/90 disabled:opacity-50"
            >
              {saving ? "Ukladám..." : product ? "Uložiť zmeny" : "Vytvoriť produkt"}
            </button>
            {product && (
              <a
                href={`/eshop/${product.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded border border-[rgba(1,45,116,0.08)] py-3 text-sm font-semibold text-[#012d74] text-center transition-colors hover:bg-[#f0f4fa]"
              >
                Zobraziť na webe
              </a>
            )}
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full rounded border border-[rgba(1,45,116,0.08)] py-3 text-sm font-semibold text-[#64748b] transition-colors hover:bg-gray-50"
            >
              Zrušiť
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
