import { WorkForm } from "@/components/admin/WorkForm";

export const metadata = { title: "Lucrare nouă" };

export default function LucrareNouaPage() {
  return (
    <>
      <header className="mb-8 sm:mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Portofoliu · lucrare nouă</div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Adaugă lucrare</h1>
      </header>
      <WorkForm />
    </>
  );
}
