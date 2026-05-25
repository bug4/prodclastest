import { PromotionForm } from "@/components/admin/PromotionForm";

export const metadata = { title: "Promoție nouă" };

export default function PromoNouaPage() {
  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Marketing · promoție nouă</div>
        <h1 className="font-serif text-5xl font-light tracking-tight">Adaugă promoție</h1>
      </header>
      <PromotionForm />
    </>
  );
}
