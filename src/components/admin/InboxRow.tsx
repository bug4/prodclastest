"use client";

import { useTransition } from "react";
import { toggleRead, deleteSubmission } from "@/app/admin/inbox/actions";
import type { ContactSubmission } from "@/lib/types";

const SOURCE_LABELS: Record<string, { label: string; color: string }> = {
  contact: { label: "Contact", color: "bg-blue-100 text-blue-800" },
  architect: { label: "Arhitect", color: "bg-brass-light/40 text-brass-deep" },
  newsletter: { label: "Newsletter", color: "bg-green-100 text-green-800" },
};

export function InboxRow({ submission }: { submission: ContactSubmission }) {
  const [pending, startTransition] = useTransition();
  const src = SOURCE_LABELS[submission.source ?? "contact"] ?? SOURCE_LABELS.contact;

  return (
    <details className={`border-t border-line ${pending ? "opacity-60" : ""}`}>
      <summary className={`p-4 cursor-pointer flex items-center gap-4 hover:bg-bg/50 transition-colors ${!submission.is_read ? "font-medium" : ""}`}>
        {!submission.is_read && <span className="w-2 h-2 rounded-full bg-brass shrink-0" />}
        <span className={`text-[10px] tracking-[0.15em] uppercase px-2 py-1 rounded-full ${src.color}`}>{src.label}</span>
        <div className="flex-1 min-w-0">
          <div className="text-sm truncate">
            {submission.first_name} {submission.last_name}{" "}
            {submission.email && <span className="text-ink-muted">· {submission.email}</span>}
          </div>
          {submission.subject && <div className="text-xs text-ink-muted truncate">{submission.subject}</div>}
        </div>
        <span className="text-xs text-ink-muted shrink-0">
          {new Date(submission.created_at).toLocaleDateString("ro-RO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
        </span>
      </summary>

      <div className="bg-bg/30 px-6 py-5 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          {submission.phone && <div><span className="text-ink-muted text-xs uppercase tracking-wide">Telefon:</span> <a href={`tel:${submission.phone}`} className="text-brass-deep hover:underline ml-2">{submission.phone}</a></div>}
          {submission.email && <div><span className="text-ink-muted text-xs uppercase tracking-wide">Email:</span> <a href={`mailto:${submission.email}`} className="text-brass-deep hover:underline ml-2">{submission.email}</a></div>}
        </div>
        {submission.message && (
          <div>
            <div className="text-xs uppercase tracking-wide text-ink-muted mb-2">Mesaj</div>
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{submission.message}</p>
          </div>
        )}
        {submission.metadata?.studio_name !== undefined && submission.metadata?.studio_name !== null && (
          <div className="text-sm"><span className="text-ink-muted">Studio:</span> {String(submission.metadata.studio_name)}</div>
        )}

        <div className="flex gap-3 pt-3 border-t border-line">
          <button
            type="button"
            onClick={() => startTransition(() => toggleRead(submission.id, submission.is_read))}
            className="px-4 py-2 border border-line rounded-full text-xs font-medium hover:border-brass-deep transition-colors"
          >
            {submission.is_read ? "Marchează necitit" : "Marchează citit"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!confirm("Ștergi mesajul?")) return;
              startTransition(() => deleteSubmission(submission.id));
            }}
            className="px-4 py-2 border border-red-300 text-red-700 rounded-full text-xs font-medium hover:bg-red-50 transition-colors ml-auto"
          >
            Șterge
          </button>
        </div>
      </div>
    </details>
  );
}
