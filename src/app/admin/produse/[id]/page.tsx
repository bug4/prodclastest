import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = { title: "Editează produs" };

type Props = { params: Promise<{ id: string }> };

export default async function ProdusEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const [productRes, collectionsRes] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase.from("collections").select("*").order("sort_order"),
  ]);

  if (!productRes.data) notFound();

  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          Catalog · editare
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">{productRes.data.name}</h1>
      </header>

      <ProductForm product={productRes.data} collections={collectionsRes.data ?? []} />
    </>
  );
}
