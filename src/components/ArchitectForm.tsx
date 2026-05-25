"use client";

import { useState, useTransition } from "react";
import { submitArchitectApplication, type FormResult } from "@/app/actions/contact";

type Labels = {
  studio: string;
  email: string;
  phone: string;
  project: string;
  projectPlaceholder: string;
  submit: string;
  submitting: string;
};

export function ArchitectForm({ labels }: { labels: Labels }) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await submitArchitectApplication(fd);
          setResult(res);
          if (res.ok) (e.target as HTMLFormElement).reset();
        });
      }}
    >
      <div className="field-group">
        <label htmlFor="studio">{labels.studio}</label>
        <input id="studio" name="studio" type="text" required />
      </div>
      <div className="field-group">
        <label htmlFor="email">{labels.email}</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field-group">
        <label htmlFor="phone">{labels.phone}</label>
        <input id="phone" name="phone" type="tel" />
      </div>
      <div className="field-group">
        <label htmlFor="project">{labels.project}</label>
        <textarea id="project" name="project" placeholder={labels.projectPlaceholder} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-3 px-8 py-4 text-[13px] font-semibold tracking-[0.15em] uppercase rounded-full bg-brass text-ink mt-3 hover:bg-brass-light transition-colors self-start disabled:opacity-60"
      >
        {pending ? labels.submitting : labels.submit}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      {result && (
        <p className={`text-sm ${result.ok ? "text-brass" : "text-red-300"}`}>{result.message}</p>
      )}
    </form>
  );
}
