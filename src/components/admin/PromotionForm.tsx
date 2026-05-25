"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { savePromotion, deletePromotion } from "@/app/admin/promotii/actions";
import type { Promotion } from "@/lib/types";

type Props = { promotion?: Promotion | null };

export function PromotionForm({ promotion }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(promotion?.image_url ?? null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await savePromotion(fd);
          if (res && !res.ok) setError(res.message);
        });
      }}
      className="space-y-8"
    >
      {promotion?.id && <input type="hidden" name="id" value={promotion.id} />}

      <div className="bg-bg-paper rounded-2xl p-8 border border-line space-y-6">
        <h2 className="font-serif text-xl">Detalii promoție</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Titlu *" htmlFor="title">
            <input id="title" name="title" type="text" required defaultValue={promotion?.title ?? ""} className={inputStyle} />
          </Field>
          <Field label="Slug *" htmlFor="slug">
            <input id="slug" name="slug" type="text" required pattern="[a-z0-9\-]+" defaultValue={promotion?.slug ?? ""} className={inputStyle} />
          </Field>
          <Field label="Tag" htmlFor="tag" hint='ex: "Promoție de toamnă"'>
            <input id="tag" name="tag" type="text" defaultValue={promotion?.tag ?? ""} className={inputStyle} />
          </Field>
          <Field label="Discount label" htmlFor="discount_label" hint='ex: "-20%", "Pe comandă"'>
            <input id="discount_label" name="discount_label" type="text" defaultValue={promotion?.discount_label ?? ""} className={inputStyle} />
          </Field>
          <Field label="Valid până" htmlFor="valid_until" hint='ex: "Până la 15 ianuarie", "Permanent"'>
            <input id="valid_until" name="valid_until" type="text" defaultValue={promotion?.valid_until ?? ""} className={inputStyle} />
          </Field>
        </div>

        <Field label="Descriere" htmlFor="description">
          <textarea id="description" name="description" rows={4} defaultValue={promotion?.description ?? ""} className={inputStyle} />
        </Field>

        <label className="flex items-center gap-3 cursor-pointer pt-2">
          <input
            type="checkbox"
            name="is_active"
            defaultChecked={promotion?.is_active ?? true}
            className="w-5 h-5 accent-brass-deep"
          />
          <span className="text-sm">Activă (apare pe site)</span>
        </label>
      </div>

      <div className="bg-bg-paper rounded-2xl p-8 border border-line space-y-6">
        <div>
          <h2 className="font-serif text-xl mb-2">Imagine fundal</h2>
          <p className="text-sm text-ink-muted">
            Recomandat: peisaj 16:9, minim 1200×800px.{promotion?.image_url && " Lasă gol ca să păstrezi imaginea curentă."}
          </p>
        </div>

        <div className="flex items-start gap-6">
          {imagePreview && (
            <div className="relative w-48 h-32 rounded-xl overflow-hidden bg-bg-deep border border-line shrink-0">
              <Image
                src={imagePreview}
                alt=""
                fill
                className="object-cover"
                unoptimized={imagePreview.startsWith("blob:") || imagePreview.startsWith("data:")}
                sizes="192px"
              />
            </div>
          )}
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

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm">{error}</div>
      )}

      <div className="flex justify-between items-center pt-4">
        <Link href="/admin/promotii" className="text-sm text-ink-muted hover:text-ink">← Înapoi</Link>
        <div className="flex gap-3">
          {promotion?.id && (
            <button
              type="button"
              onClick={() => {
                if (!confirm(`Ștergi promoția "${promotion.title}"?`)) return;
                startTransition(async () => {
                  const res = await deletePromotion(promotion.id);
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
            {pending ? "Se salvează..." : promotion?.id ? "Salvează" : "Creează promoția"}
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
