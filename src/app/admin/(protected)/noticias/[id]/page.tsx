import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import EditarNoticiaForm from "./EditarNoticiaForm";

export const dynamic = "force-dynamic";

export default async function EditarNoticiaPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();
  const { data: noticia } = await supabase
    .from("noticias")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!noticia) return notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl">Editar Notícia</h1>
      <EditarNoticiaForm noticia={noticia} />
    </div>
  );
}
