import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = { title: "Editează produs" };

type Props = { params: Promise<{ id: string }> };

export default async function ProdusEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!product) notFound();

  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          Catalog · editare
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">{product.name}</h1>
      </header>

      <ProductForm product={product} />
    </>
  );
}
