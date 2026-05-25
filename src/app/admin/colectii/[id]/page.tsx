import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CollectionForm } from "@/components/admin/CollectionForm";

export const metadata = { title: "Editează colecția" };

type Props = { params: Promise<{ id: string }> };

export default async function ColectieEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: collection } = await supabase.from("collections").select("*").eq("id", id).maybeSingle();
  if (!collection) notFound();

  return (
    <>
      <header className="mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Organizare · editare</div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">{collection.name}</h1>
      </header>
      <CollectionForm collection={collection} />
    </>
  );
}
