import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
    <article className="container-page max-w-3xl py-12 sm:py-16 lg:py-20">
      <Link href="/#noticias" className="text-sm font-medium text-moezia-red hover:underline">
        ← Voltar para notícias
      </Link>
      <p className="mt-6 text-sm text-moezia-dark/50">
        {new Date(noticia.data).toLocaleDateString("pt-BR")}
        {noticia.autor ? ` · ${noticia.autor}` : ""}
      </p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">{noticia.titulo}</h1>

      {noticia.imagem_url && (
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-lg bg-moezia-cream">
          <Image
            src={noticia.imagem_url}
            alt={noticia.titulo}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-neutral mt-8 max-w-none prose-a:text-moezia-red">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{noticia.conteudo}</ReactMarkdown>
      </div>
    </article>
  );
}
