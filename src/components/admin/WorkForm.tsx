"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveWork, deleteWork } from "@/app/admin/lucrari/actions";
import type { Work } from "@/lib/types";

type Props = { work?: Work | null };

export function WorkForm({ work }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(work?.cover_image_url ?? null);
  const [gallery, setGallery] = useState<string[]>(work?.gallery_images ?? []);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  const removeGalleryImage = (idx: number) => {
    setGallery((g) => g.filter((_, i) => i !== idx));
  };

  const removeNewPreview = (idx: number) => {
    setNewGalleryPreviews((g) => g.filter((_, i) => i !== idx));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        // Inject existing gallery as JSON string
        fd.set("existing_gallery", JSON.stringify(gallery));
        startTransition(async () => {
          const res = await saveWork(fd);
          if (res && !res.ok) setError(res.message);
        });
      }}
      className="space-y-8"
    >
      {work?.id && <input type="hidden" name="id" value={work.id} />}

      <div className="bg-bg-paper rounded-2xl p-5 sm:p-8 border border-line space-y-6">
        <h2 className="font-serif text-xl">Detalii lucrare</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Titlu *" htmlFor="title">
            <input id="title" name="title" type="text" required defaultValue={work?.title ?? ""} className={inputStyle} />
          </Field>
          <Field label="Slug *" htmlFor="slug" hint="apare in URL: /lucrari/apartament-87">
            <input id="slug" name="slug" type="text" required pattern="[a-z0-9\-]+" defaultValue={work?.slug ?? ""} className={inputStyle} />
          </Field>
          <Field label="Categorie *" htmlFor="category">
            <select id="category" name="category" required defaultValue={work?.category ?? "lavoare"} className={inputStyle}>
              <option value="lavoare">Lavoare</option>
              <option value="blaturi">Blaturi</option>
              <option value="altele">Alte lucrări</option>
            </select>
          </Field>
          <Field label="Subtitlu (Designer / Studio)" htmlFor="subtitle">
            <input id="subtitle" name="subtitle" type="text" defaultValue={work?.subtitle ?? ""} className={inputStyle} />
          </Field>
        </div>

        <Field label="Descriere" htmlFor="description">
          <textarea id="description" name="description" rows={6} defaultValue={work?.description ?? ""} className={inputStyle} />
        </Field>

        <div className="grid md:grid-cols-4 gap-6 pt-2">
          <Field label="Locație" htmlFor="info_locatie">
            <input id="info_locatie" name="info_locatie" type="text" defaultValue={work?.info?.locatie ?? ""} className={inputStyle} />
          </Field>
          <Field label="Suprafață" htmlFor="info_suprafata" hint='ex: 120mp'>
            <input id="info_suprafata" name="info_suprafata" type="text" defaultValue={work?.info?.suprafata ?? ""} className={inputStyle} />
          </Field>
          <Field label="An" htmlFor="info_an">
            <input id="info_an" name="info_an" type="text" defaultValue={work?.info?.an ?? ""} className={inputStyle} />
          </Field>
          <Field label="Designer" htmlFor="info_designer">
            <input id="info_designer" name="info_designer" type="text" defaultValue={work?.info?.designer ?? ""} className={inputStyle} />
          </Field>
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_published"
              defaultChecked={work?.is_published ?? true}
              className="w-5 h-5 accent-brass-deep"
            />
            <span className="text-sm">Publicat (vizibil pe site)</span>
          </label>
          <label className="flex items-center gap-3 text-sm">
            Ordine:
            <input
              name="sort_order"
              type="number"
              defaultValue={work?.sort_order ?? 0}
              className="w-20 bg-bg border-0 border-b border-line text-ink py-1 px-2 focus:outline-none focus:border-brass-deep"
            />
          </label>
        </div>
      </div>

      {/* Cover image */}
      <div className="bg-bg-paper rounded-2xl p-5 sm:p-8 border border-line space-y-5">
        <div>
          <h2 className="font-serif text-xl mb-2">Imagine principală (cover)</h2>
          <p className="text-sm text-ink-muted">
            Apare în grid-ul de lucrări. Recomandat: 16:10 sau 4:3, minim 1200px lățime.
          </p>
        </div>

        <div className="flex items-start gap-6 flex-wrap">
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

      {/* Gallery images */}
      <div className="bg-bg-paper rounded-2xl p-5 sm:p-8 border border-line space-y-5">
        <div>
          <h2 className="font-serif text-xl mb-2">Galerie (poze adiționale)</h2>
          <p className="text-sm text-ink-muted">
            Poze care apar în slider-ul de pe pagina lucrării. Poți selecta mai multe deodată.
          </p>
        </div>

        {/* Galerie existenta */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {gallery.map((url, idx) => (
              <div key={url} className="relative aspect-square rounded-lg overflow-hidden border border-line group">
                <Image src={url} alt="" fill className="object-cover" sizes="200px" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(idx)}
                  className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs hover:bg-red-600"
                  aria-label="Sterge"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Previews pt poze noi adaugate */}
        {newGalleryPreviews.length > 0 && (
          <div>
            <div className="text-xs text-ink-muted mb-2">Poze noi de încărcat:</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {newGalleryPreviews.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-brass group">
                  <Image src={url} alt="" fill className="object-cover" unoptimized sizes="200px" />
                  <button
                    type="button"
                    onClick={() => removeNewPreview(idx)}
                    className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                    aria-label="Sterge"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <input
          type="file"
          name="gallery"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = e.target.files;
            if (!files) return;
            const previews: string[] = [];
            Array.from(files).forEach((f) => previews.push(URL.createObjectURL(f)));
            setNewGalleryPreviews((g) => [...g, ...previews]);
          }}
          className="block w-full text-sm file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:bg-ink file:text-bg-paper file:cursor-pointer file:font-medium file:text-xs file:tracking-[0.15em] file:uppercase hover:file:bg-brass-deep"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm">{error}</div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
        <Link href="/admin/lucrari" className="text-sm text-ink-muted hover:text-ink">← Înapoi</Link>
        <div className="flex gap-3">
          {work?.id && (
            <button
              type="button"
              onClick={() => {
                if (!confirm(`Ștergi lucrarea "${work.title}"?`)) return;
                startTransition(async () => {
                  const res = await deleteWork(work.id);
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
            {pending ? "Se salvează..." : work?.id ? "Salvează" : "Creează"}
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