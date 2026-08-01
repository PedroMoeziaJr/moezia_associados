import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NoticiaPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient();
  const { data: noticia } = await supabase
    .from("noticias")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!noticia) return notFound();

  return (
    <article className="container-page max-w-3xl py-16">
      <Link href="/#noticias" className="text-sm font-medium text-moezia-red hover:underline">
        ← Voltar para notícias
      </Link>
      <p className="mt-6 text-xs text-moezia-dark/50">
        {new Date(noticia.data).toLocaleDateString("pt-BR")}
        {noticia.autor ? ` · ${noticia.autor}` : ""}
      </p>
      <h1 className="mt-2 font-serif text-4xl">{noticia.titulo}</h1>
      <div className="prose prose-neutral mt-8 max-w-none whitespace-pre-wrap">
        {noticia.conteudo}
      </div>
    </article>
  );
}
