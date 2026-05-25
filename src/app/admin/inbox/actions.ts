"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleRead(id: string, isRead: boolean) {
  const supabase = await createClient();
  await supabase.from("contact_submissions").update({ is_read: !isRead }).eq("id", id);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}

export async function deleteSubmission(id: string) {
  const supabase = await createClient();
  await supabase.from("contact_submissions").delete().eq("id", id);
  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
}
