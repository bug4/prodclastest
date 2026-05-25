import { CollectionForm } from "@/components/admin/CollectionForm";

export const metadata = { title: "Colecție nouă" };

export default function ColectieNouaPage() {
  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Organizare · colecție nouă</div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Adaugă colecție</h1>
      </header>
      <CollectionForm />
    </>
  );
}
