"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { saveCollection, deleteCollection } from "@/app/admin/colectii/actions";
import type { Collection } from "@/lib/types";

type Props = { collection?: Collection | null };

export function CollectionForm({ collection }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await saveCollection(fd);
          if (res && !res.ok) setError(res.message);
        });
      }}
      className="space-y-6 max-w-2xl"
    >
      {collection?.id && <input type="hidden" name="id" value={collection.id} />}

      <div className="bg-bg-paper rounded-2xl p-5 sm:p-8 border border-line space-y-6">
        <label className="block">
          <span className="text-[11px] tracking-[0.2em] uppercase text-ink-muted block mb-2">Nume *</span>
          <input name="name" type="text" required defaultValue={collection?.name ?? ""} className={inputStyle} />
        </label>
        <label className="block">
          <span className="text-[11px] tracking-[0.2em] uppercase text-ink-muted block mb-2">Slug *</span>
          <input name="slug" type="text" required pattern="[a-z0-9\-]+" defaultValue={collection?.slug ?? ""} className={inputStyle} />
        </label>
        <label className="block">
          <span className="text-[11px] tracking-[0.2em] uppercase text-ink-muted block mb-2">Descriere</span>
          <textarea name="description" rows={3} defaultValue={collection?.description ?? ""} className={inputStyle} />
        </label>
        <label className="block">
          <span className="text-[11px] tracking-[0.2em] uppercase text-ink-muted block mb-2">Ordine sortare</span>
          <input name="sort_order" type="number" defaultValue={collection?.sort_order ?? 0} className={inputStyle} />
        </label>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 text-sm">{error}</div>}

      <div className="flex justify-between items-center">
        <Link href="/admin/colectii" className="text-sm text-ink-muted hover:text-ink">← Înapoi</Link>
        <div className="flex gap-3">
          {collection?.id && (
            <button
              type="button"
              onClick={() => {
                if (!confirm(`Ștergi colecția "${collection.name}"? Produsele asociate vor rămâne, dar fără colecție.`)) return;
                startTransition(async () => {
                  const res = await deleteCollection(collection.id);
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
            {pending ? "Se salvează..." : collection?.id ? "Salvează" : "Creează"}
          </button>
        </div>
      </div>
    </form>
  );
}

const inputStyle = "w-full bg-bg border-0 border-b border-line text-ink py-3 px-0 focus:outline-none focus:border-brass-deep transition-colors";
