import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { WorkForm } from "@/components/admin/WorkForm";

export const metadata = { title: "Editează lucrarea" };

type Props = { params: Promise<{ id: string }> };

export default async function LucrareEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: work } = await supabase.from("works").select("*").eq("id", id).maybeSingle();
  if (!work) notFound();

  return (
    <>
      <header className="mb-8 sm:mb-10">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Portofoliu · editare</div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">{work.title}</h1>
      </header>
      <WorkForm work={work} />
    </>
  );
}
