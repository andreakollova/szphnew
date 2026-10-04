"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBrowserSupabaseClient } from "@szph/db/client";
import { slugify } from "@szph/ui";
import type { Article, ArticleCategory, VisibleOn, Status } from "@szph/db/types";
import { optimizeImage } from "../../utils/optimizeImage";
import { RichTextEditor } from "./RichTextEditor";

const articleSchema = z.object({
  title: z.string().min(3, "Nadpis musí mať aspoň 3 znaky"),
  slug: z.string().min(3, "Slug musí mať aspoň 3 znaky").regex(/^[a-z0-9-]+$/, "Len malé písmená, čísla a pomlčky"),
  excerpt: z.string().min(1, "Excerpt je povinný").refine(
    (val) => val.trim().split(/\s+/).filter(Boolean).length >= 10,
    "Excerpt musí mať aspoň 10 slov"
  ).refine(
    (val) => val.trim().split(/\s+/).filter(Boolean).length <= 17,
    "Excerpt môže mať maximálne 17 slov"
  ),
  content: z.string().min(1, "Obsah článku je povinný"),
  cover_image_url: z.string().min(1, "Titulná fotka je povinná"),
  video_url: z.union([z.string().url("Zadajte platnú URL adresu"), z.literal(""), z.undefined()]),
  category: z.enum(["novinky", "reprezentacia", "kluby", "oznamy"]),
  visible_on: z.enum(["fieldhockey", "szph", "both"]),
  status: z.enum(["draft", "published"]),
  published_at: z.string().optional(),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

interface ArticleFormProps {
  article?: Article;
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);
  const [saved, setSaved]   = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(article?.cover_image_url ?? null);

  const supabase = createBrowserSupabaseClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title:           article?.title ?? "",
      slug:            article?.slug ?? "",
      excerpt:         article?.excerpt ?? "",
      content:         article?.content ?? "",
      cover_image_url: article?.cover_image_url ?? "",
      video_url:       (article as any)?.video_url ?? "",
      category:        article?.category ?? "novinky",
      visible_on:      article?.visible_on ?? "both",
      status:          article?.status ?? "draft",
      published_at:    article?.published_at ? new Date(article.published_at).toISOString().slice(0, 16) : "",
    },
  });

  const titleValue = watch("title");

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    register("title").onChange(e);
    if (!article) {
      setValue("slug", slugify(value));
    }
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function uploadImage(file: File): Promise<string> {
    const { blob, filename } = await optimizeImage(file);
    const path = `${Date.now()}-${filename}`;
    const { data, error } = await supabase.storage
      .from("articles-covers")
      .upload(path, blob, { cacheControl: "3600", upsert: false, contentType: "image/webp" });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage
      .from("articles-covers")
      .getPublicUrl(data.path);
    return publicUrl;
  }

  async function onSubmit(values: ArticleFormValues) {
    setSaving(true);
    setError(null);

    try {
      let coverUrl = values.cover_image_url ?? "";
      if (imageFile) {
        coverUrl = await uploadImage(imageFile);
      }

      const payload = {
        ...values,
        cover_image_url: coverUrl || null,
        video_url: values.video_url || null,
        published_at:
          values.status === "published"
            ? (values.published_at ? new Date(values.published_at).toISOString() : (article?.published_at ?? new Date().toISOString()))
            : null,
      };

      if (article) {
        const { error: dbErr } = await supabase.from("articles").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", article.id);
        if (dbErr) throw new Error(dbErr.message);
      } else {
        const { error: dbErr } = await supabase.from("articles").insert(payload);
        if (dbErr) throw new Error(dbErr.message);
      }

      // Slack notification when article is published
      const isNewPublish = values.status === "published" && (!article || article.status !== "published");
      if (isNewPublish) {
        fetch("/api/slack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "article_published",
            data: { title: values.title, slug: values.slug, category: values.category, visible_on: values.visible_on },
          }),
        }).catch(() => {});
      }

      if (article) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/admin/clanky");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nastala chyba");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, (errs) => { console.error("Validation errors:", errs); setError("Validačná chyba: " + Object.values(errs).map((e: any) => e?.message).filter(Boolean).join(", ")); window.scrollTo({ top: 0, behavior: "smooth" }); })} className="space-y-6">
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
          <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <h2 className="font-bold text-[#051937] mb-4">Obsah článku</h2>

            <div className="space-y-4">
              {/* Nadpis */}
              <div>
                <label className="field-label">Nadpis</label>
                <input
                  {...register("title")}
                  onChange={handleTitleChange}
                  className="field-input"
                  placeholder="Nadpis článku..."
                />
                {errors.title && <p className="field-error">{errors.title.message}</p>}
              </div>

              {/* Slug */}
              <div>
                <label className="field-label">URL slug</label>
                <input {...register("slug")} className="field-input font-mono text-xs" placeholder="url-clanku" />
                {errors.slug && <p className="field-error">{errors.slug.message}</p>}
              </div>

              {/* Excerpt */}
              <div>
                <label className="field-label">
                  Krátky popis (excerpt)
                  {(() => {
                    const wc = (watch("excerpt") || "").trim().split(/\s+/).filter(Boolean).length;
                    const color = wc >= 10 && wc <= 17 ? "#16a34a" : "#f87171";
                    return <span style={{ color, marginLeft: 8, fontWeight: 700, textTransform: "none", letterSpacing: 0 }}>{wc} / 10-17 slov</span>;
                  })()}
                </label>
                <textarea
                  {...register("excerpt")}
                  rows={2}
                  className="field-input resize-none"
                  placeholder="Krátky popis článku pre náhľady (10-30 slov)..."
                />
                {errors.excerpt && <p className="field-error">{errors.excerpt.message}</p>}
              </div>

              {/* Content — Rich Text Editor */}
              <div>
                <label className="field-label">Obsah</label>
                <RichTextEditor
                  content={watch("content") ?? ""}
                  onChange={(html) => setValue("content", html)}
                />
                {errors.content && <p className="field-error">{errors.content.message}</p>}
              </div>
            </div>
          </div>

          {/* Cover image */}
          <div className="rounded p-6" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <h2 className="font-bold text-[#051937] mb-4">Titulná fotka</h2>
            {imagePreview && (
              <div className="mb-4 relative h-48 w-full overflow-hidden rounded">
                <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setImagePreview(null); setImageFile(null); setValue("cover_image_url", ""); }}
                  className="absolute right-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white"
                >
                  Odstrániť
                </button>
              </div>
            )}
            <div className="mb-4">
              <label className="field-label">Video URL (YouTube)</label>
              <input {...register("video_url")} className="field-input" placeholder="https://youtube.com/watch?v=..." />
              {errors.video_url && <p className="field-error">{errors.video_url.message}</p>}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-[#64748b] file:mr-4 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#051937] hover:file:bg-gray-200"
            />
            <p className="mt-2 text-xs text-[#94a3b8]">alebo zadaj URL:</p>
            <input
              {...register("cover_image_url")}
              className="field-input mt-1"
              placeholder="https://..."
            />
            {errors.cover_image_url && <p className="field-error">{errors.cover_image_url.message}</p>}
          </div>
        </div>

        {/* Postranný panel */}
        <div className="space-y-4">
          <div className="rounded p-5" style={{ background: "#ffffff", border: "1px solid rgba(1,45,116,0.08)" }}>
            <h2 className="font-bold text-[#051937] mb-4">Nastavenia</h2>
            <div className="space-y-4">

              {/* Status */}
              <div>
                <label className="field-label">Stav</label>
                <select {...register("status")} className="field-select">
                  <option value="draft">Draft</option>
                  <option value="published">Publikovaný</option>
                </select>
              </div>

              {/* Dátum publikácie */}
              <div>
                <label className="field-label">Dátum publikácie</label>
                <input type="datetime-local" {...register("published_at")} className="field-input" />
              </div>

              {/* Kategória */}
              <div>
                <label className="field-label">Kategória</label>
                <select {...register("category")} className="field-select">
                  <option value="novinky">Novinky</option>
                  <option value="reprezentacia">Reprezentácia</option>
                  <option value="kluby">Kluby</option>
                  <option value="oznamy">Oznamy</option>
                </select>
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
              {saving ? "Ukladám..." : article ? "Uložiť zmeny" : "Vytvoriť článok"}
            </button>
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

      <style jsx>{`
        .field-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 0.375rem;
        }
        .field-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(1,45,116,0.15);
          background: #ffffff;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          color: #051937;
          outline: none;
          transition: all 0.15s;
        }
        .field-input:focus {
          border-color: rgba(1,111,180,0.5);
          background: #f8f9fa;
        }
        .field-input::placeholder {
          color: #94a3b8;
        }
        .field-select {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(1,45,116,0.15);
          background: #ffffff;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          color: #051937;
          outline: none;
        }
        .field-select option {
          background: #ffffff;
        }
        .field-error {
          color: #f87171;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </form>
  );
}
