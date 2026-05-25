import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PromotionForm } from "@/components/admin/PromotionForm";

export const metadata = { title: "Editează promoția" };

type Props = { params: Promise<{ id: string }> };

export default async function PromoEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: promo } = await supabase.from("promotions").select("*").eq("id", id).maybeSingle();
  if (!promo) notFound();

  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Marketing · editare</div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">{promo.title}</h1>
      </header>
      <PromotionForm promotion={promo} />
    </>
  );
}
