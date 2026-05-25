"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveArticle, deleteArticle } from "@/app/admin/articole/actions";
import type { Article } from "@/lib/types";

type Props = { article?: Article | null };

export function ArticleForm({ article }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(article?.cover_url ?? null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await saveArticle(fd);
          if (res && !res.ok) setError(res.message);
        });
      }}
      className="space-y-8 max-w-4xl"
    >
      {article?.id && <input type="hidden" name="id" value={article.id} />}

      <div className="bg-bg-paper rounded-2xl p-8 border border-line space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Titlu *" htmlFor="title">
            <input id="title" name="title" type="text" required defaultValue={article?.title ?? ""} className={inputStyle} />
          </Field>
          <Field label="Slug *" htmlFor="slug">
            <input id="slug" name="slug" type="text" required pattern="[a-z0-9\-]+" defaultValue={article?.slug ?? ""} className={inputStyle} />
          </Field>
          <Field label="Categorie" htmlFor="category" hint='Ghid, Inspirație, Știri'>
            <input id="category" name="category" type="text" defaultValue={article?.category ?? ""} className={inputStyle} />
          </Field>
        </div>

        <Field label="Excerpt (rezumat)" htmlFor="excerpt">
          <textarea id="excerpt" name="excerpt" rows={2} defaultValue={article?.excerpt ?? ""} className={inputStyle} />
        </Field>

        <Field label="Conținut" htmlFor="content" hint="Markdown sau HTML — vei putea afișa pe site oricum vrei">
          <textarea id="content" name="content" rows={14} defaultValue={article?.content ?? ""} className={`${inputStyle} font-mono text-sm`} />
        </Field>

        <label className="flex items-center gap-3 cursor-pointer pt-2">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={article?.is_published ?? false}
            className="w-5 h-5 accent-brass-deep"
          />
          <span className="text-sm">Publicat (vizibil pe site)</span>
        </label>
      </div>

      <div className="bg-bg-paper rounded-2xl p-8 border border-line space-y-6">
        <div>
          <h2 className="font-serif text-xl mb-2">Imagine de copertă</h2>
          <p className="text-sm text-ink-muted">{article?.cover_url && "Lasă gol ca să păstrezi imaginea curentă."}</p>
        </div>

        <div className="flex items-start gap-6">
          {coverPreview && (
            <div className="relative w-48 h-32 rounded-xl overflow-hidden bg-bg-deep border border-line shrink-0">
              <Image
                src={coverPreview}
                alt=""
                fill
                className="object-cover"
                unoptimized={coverPreview.startsWith("blob:") || coverPreview.startsWith("data:")}
                sizes="192px"
              />
            </div>
          )}
          <input
            type="file"
            name="cover"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setCoverPreview(URL.createObjectURL(f));
            }}
            className="block w-full text-sm file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:bg-ink file:text-bg-paper file:cursor-pointer file:font-medium file:text-xs file:tracking-[0.15em] file:uppercase hover:file:bg-brass-deep"
          />
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm">{error}</div>}

      <div className="flex justify-between items-center pt-4">
        <Link href="/admin/articole" className="text-sm text-ink-muted hover:text-ink">← Înapoi</Link>
        <div className="flex gap-3">
          {article?.id && (
            <button
              type="button"
              onClick={() => {
                if (!confirm(`Ștergi articolul "${article.title}"?`)) return;
                startTransition(async () => {
                  const res = await deleteArticle(article.id);
                  if (res && !res.ok) setError(res.message);
                });
              }}
              className="px-5 py-3 border border-red-300 text-red-700 rounded-full text-sm font-medium hover:bg-red-50"
            >
              Șterge
            </button>
          )}
          <button
            type="submit"
            disabled={pending}
            className="px-8 py-3 bg-ink text-bg-paper rounded-full text-[13px] font-semibold tracking-[0.15em] uppercase hover:bg-brass-deep disabled:opacity-60"
          >
            {pending ? "Se salvează..." : article?.id ? "Salvează" : "Creează articolul"}
          </button>
        </div>
      </div>
    </form>
  );
}

const inputStyle = "w-full bg-bg border-0 border-b border-line text-ink py-3 px-0 focus:outline-none focus:border-brass-deep transition-colors";

function Field({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-[11px] tracking-[0.2em] uppercase text-ink-muted block mb-2">{label}</span>
      {children}
      {hint && <span className="text-xs text-ink-muted block mt-1.5">{hint}</span>}
    </label>
  );
}
