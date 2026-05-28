"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveProduct, deleteProduct } from "@/app/admin/produse/actions";
import type { Collection, Product } from "@/lib/types";

type Props = {
  product?: Product | null;
  collections: Collection[];
};

export function ProductForm({ product, collections }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url ?? null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
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

          <Field label="Colecție" htmlFor="collection_id">
            <select
              id="collection_id"
              name="collection_id"
              defaultValue={product?.collection_id ?? ""}
              className={inputStyle}
            >
              <option value="">— fără colecție —</option>
              {collections.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
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

      {/* Imagine */}
      <div className="bg-bg-paper rounded-2xl p-5 sm:p-8 border border-line space-y-6">
        <div>
          <h2 className="font-serif text-xl mb-2">Imagine produs</h2>
          <p className="text-sm text-ink-muted">
            Recomandat: imagine pătrată sau 3:4, minim 800×800px, JPG/PNG sub 10MB.
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