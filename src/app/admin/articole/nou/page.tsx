import { ArticleForm } from "@/components/admin/ArticleForm";

export const metadata = { title: "Articol nou" };

export default function ArticolNouPage() {
  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Conținut · articol nou</div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Scrie articol</h1>
      </header>
      <ArticleForm />
    </>
  );
}
