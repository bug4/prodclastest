import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = { title: "Produs nou" };

export default function ProdusNouPage() {
  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Catalog · produs nou</div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Adaugă produs</h1>
      </header>

      <ProductForm />
    </>
  );
}
