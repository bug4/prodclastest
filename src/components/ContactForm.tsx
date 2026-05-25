"use client";

import { useState, useTransition } from "react";
import { submitContact, type FormResult } from "@/app/actions/contact";

export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<FormResult | null>(null);

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await submitContact(fd);
          setResult(res);
          if (res.ok) (e.target as HTMLFormElement).reset();
        });
      }}
    >
      <div className="field-group">
        <label htmlFor="first_name">Prenume</label>
        <input id="first_name" name="first_name" type="text" required />
      </div>
      <div className="field-group">
        <label htmlFor="last_name">Nume</label>
        <input id="last_name" name="last_name" type="text" required />
      </div>
      <div className="field-group">
        <label htmlFor="phone">Telefon</label>
        <input id="phone" name="phone" type="tel" />
      </div>
      <div className="field-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field-group md:col-span-2">
        <label htmlFor="subject">Subiect</label>
        <input id="subject" name="subject" type="text" placeholder="Despre ce este vorba..." />
      </div>
      <div className="field-group md:col-span-2">
        <label htmlFor="message">Mesaj</label>
        <textarea id="message" name="message" rows={4} required />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="md:col-span-2 inline-flex items-center justify-center gap-3 px-8 py-4 text-[13px] font-semibold tracking-[0.15em] uppercase rounded-full bg-ink text-bg-paper border border-bg-paper/20 hover:bg-brass-deep transition-colors disabled:opacity-60"
      >
        {pending ? "Se trimite..." : "Trimite mesajul"}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
      {result && (
        <p className={`md:col-span-2 text-center text-sm ${result.ok ? "text-brass" : "text-red-300"}`}>
          {result.message}
        </p>
      )}
    </form>
  );
}
