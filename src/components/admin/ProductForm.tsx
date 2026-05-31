"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveProduct, deleteProduct } from "@/app/admin/produse/actions";
import type { Product } from "@/lib/types";

type Props = {
  product?: Product | null;
};

export function ProductForm({ product }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url ?? null);
  const [gallery, setGallery] = useState<string[]>(product?.gallery_images ?? []);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  const moveGallery = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= gallery.length) return;
    setGallery((g) => {
      const copy = [...g];
      [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
      return copy;
    });
  };

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
        // Inject gallery existenta ca JSON string (cu ordinea actualizata)
        fd.set("existing_gallery", JSON.stringify(gallery));
        startTransition(async () => {
          const res = await saveProduct(fd);
          if (res && !res.ok) setError(res.message);
        });
      }}
      className="space-y-8"
    >
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      <div className="bg-bg-paper rounded-2xl p-5 sm:p-8 border border-line space-y-6">
        <h2 className="font-serif text-xl">Detalii produs</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Nume produs *" htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={product?.name ?? ""}
              className={inputStyle}
            />
          </Field>

          <Field label="Slug (URL) *" htmlFor="slug" hint="folosit in adresa: /produse/calacatta-gold">
            <input
              id="slug"
              name="slug"
              type="text"
              required
              pattern="[a-z0-9\-]+"
              defaultValue={product?.slug ?? ""}
              className={inputStyle}
            />
          </Field>

          <Field label="Grosime *" htmlFor="thickness">
            <select
              id="thickness"
              name="thickness"
              required
              defaultValue={product?.thickness ?? "6mm"}
              className={inputStyle}
            >
              <option value="6mm">6mm</option>
              <option value="12mm">12mm</option>
            </select>
          </Field>

          <Field label="Preț (MDL / m²) *" htmlFor="price_mdl">
            <input
              id="price_mdl"
              name="price_mdl"
              type="number"
              min="0"
              required
              defaultValue={product?.price_mdl ?? ""}
              className={inputStyle}
            />
          </Field>

          <Field label="Origine" htmlFor="origin" hint="Italia, Spania...">
            <input
              id="origin"
              name="origin"
              type="text"
              defaultValue={product?.origin ?? ""}
              className={inputStyle}
            />
          </Field>

          <Field label="Format" htmlFor="size" hint="60×120, 120×280">
            <input
              id="size"
              name="size"
              type="text"
              defaultValue={product?.size ?? ""}
              className={inputStyle}
            />
          </Field>

          <Field label="Finisaj" htmlFor="finish" hint="Lucios, Mat, Satin">
            <input
              id="finish"
              name="finish"
              type="text"
              defaultValue={product?.finish ?? ""}
              className={inputStyle}
            />
          </Field>
        </div>

        <Field label="Descriere" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={product?.description ?? ""}
            className={inputStyle}
          />
        </Field>

        <div className="flex flex-wrap gap-8 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="in_stock"
              defaultChecked={product?.in_stock ?? true}
              className="w-5 h-5 accent-brass-deep"
            />
            <span className="text-sm">În stoc</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="is_featured"
              defaultChecked={product?.is_featured ?? false}
              className="w-5 h-5 accent-brass-deep"
            />
            <span className="text-sm">Featured (apare pe homepage)</span>
          </label>
        </div>
      </div>

      {/* Imagine principala (cover) */}
      <div className="bg-bg-paper rounded-2xl p-5 sm:p-8 border border-line space-y-6">
        <div>
          <h2 className="font-serif text-xl mb-2">Imagine principală (cover)</h2>
          <p className="text-sm text-ink-muted">
            Apare pe card în catalog. Recomandat: imagine pătrată sau 3:4, minim 800×800px.
            {product?.image_url && " Lasă gol ca să păstrezi imaginea curentă."}
          </p>
        </div>

        <div className="flex items-start gap-6">
          {imagePreview && (
            <div className="relative w-40 h-40 rounded-xl overflow-hidden bg-bg-deep border border-line shrink-0">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized={imagePreview.startsWith("blob:") || imagePreview.startsWith("data:")}
                sizes="160px"
              />
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setImagePreview(URL.createObjectURL(f));
              }}
              className="block w-full text-sm file:mr-4 file:py-3 file:px-5 file:rounded-full file:border-0 file:bg-ink file:text-bg-paper file:cursor-pointer file:font-medium file:text-xs file:tracking-[0.15em] file:uppercase hover:file:bg-brass-deep"
            />
          </div>
        </div>
      </div>

      {/* Galerie (imagini adiționale) */}
      <div className="bg-bg-paper rounded-2xl p-5 sm:p-8 border border-line space-y-5">
        <div>
          <h2 className="font-serif text-xl mb-2">Galerie (imagini adiționale)</h2>
          <p className="text-sm text-ink-muted">
            Apar dedesubt pe pagina produsului (poze din ambient, detalii textură etc.). Poți selecta mai multe odată.
            Folosește săgețile pentru a reordona.
          </p>
        </div>

        {/* Galerie existenta cu reordonare */}
        {gallery.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              Imagini salvate ({gallery.length})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {gallery.map((url, idx) => (
                <div key={url} className="relative aspect-square rounded-lg overflow-hidden border border-line group">
                  <Image src={url} alt="" fill className="object-cover" sizes="200px" />

                  {/* Sageata sus/stanga */}
                  <button
                    type="button"
                    onClick={() => moveGallery(idx, -1)}
                    disabled={idx === 0}
                    aria-label="Mută la stânga"
                    className="absolute top-1 left-1 w-7 h-7 rounded-full bg-ink/80 text-bg-paper opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  {/* Sageata jos/dreapta */}
                  <button
                    type="button"
                    onClick={() => moveGallery(idx, 1)}
                    disabled={idx === gallery.length - 1}
                    aria-label="Mută la dreapta"
                    className="absolute top-1 left-10 w-7 h-7 rounded-full bg-ink/80 text-bg-paper opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>

                  {/* Sterge */}
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    aria-label="Șterge"
                    className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>

                  {/* Pozitie */}
                  <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded-full bg-ink/80 text-bg-paper text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Previews pt poze noi */}
        {newGalleryPreviews.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              Imagini noi de încărcat ({newGalleryPreviews.length})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {newGalleryPreviews.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2 border-brass group">
                  <Image src={url} alt="" fill className="object-cover" unoptimized sizes="200px" />
                  <button
                    type="button"
                    onClick={() => removeNewPreview(idx)}
                    aria-label="Șterge"
                    className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
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
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center pt-4">
        <Link href="/admin/produse" className="text-sm text-ink-muted hover:text-ink transition-colors">
          ← Înapoi la listă
        </Link>

        <div className="flex gap-3">
          {product?.id && (
            <button
              type="button"
              onClick={() => {
                if (!confirm(`Sigur ștergi "${product.name}"? Acțiunea e ireversibilă.`)) return;
                startTransition(async () => {
                  const res = await deleteProduct(product.id);
                  if (res && !res.ok) setError(res.message);
                });
              }}
              className="px-5 py-3 border border-red-300 text-red-700 rounded-full text-sm font-medium hover:bg-red-50 transition-colors"
            >
              Șterge
            </button>
          )}
          <button
            type="submit"
            disabled={pending}
            className="px-8 py-3 bg-ink text-bg-paper rounded-full text-[13px] font-semibold tracking-[0.15em] uppercase hover:bg-brass-deep transition-colors disabled:opacity-60"
          >
            {pending ? "Se salvează..." : product?.id ? "Salvează modificările" : "Creează produsul"}
          </button>
        </div>
      </div>
    </form>
  );
}

const inputStyle =
  "w-full bg-bg border-0 border-b border-line text-ink py-3 px-0 focus:outline-none focus:border-brass-deep transition-colors";

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="text-[11px] tracking-[0.2em] uppercase text-ink-muted block mb-2">{label}</span>
      {children}
      {hint && <span className="text-xs text-ink-muted block mt-1.5">{hint}</span>}
    </label>
  );
}