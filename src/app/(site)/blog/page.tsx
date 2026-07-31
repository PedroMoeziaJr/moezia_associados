import type { Metadata } from "next";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Notícias Jurídicas | Moézia Associados",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let noticias: { slug: string; titulo: string; conteudo: string; data: string; autor: string | null }[] = [];
  let erro: string | null = null;

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("noticias")
      .select("slug, titulo, conteudo, data, autor")
      .order("data", { ascending: false });
    if (error) throw error;
    noticias = data ?? [];
  } catch (e) {
    erro = "Não foi possível carregar as notícias no momento.";
  }

  return (
    <div className="container-page py-16">
      <h1 className="font-serif text-4xl">Notícias Jurídicas</h1>
      <p className="mt-3 max-w-2xl text-moezia-dark/70">
        Acompanhe atualizações e conteúdos produzidos pelo Moézia Associados.
      </p>

      {erro && (
        <p className="mt-10 rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
          {erro} Verifique se o Supabase está configurado (.env.local).
        </p>
      )}

      {!erro && noticias.length === 0 && (
        <p className="mt-10 text-moezia-dark/60">Nenhuma notícia publicada ainda.</p>
      )}

      <div className="mt-10 space-y-6">
        {noticias.map((noticia) => (
          <Link
            key={noticia.slug}
            href={`/blog/${noticia.slug}`}
            className="block rounded-lg border border-black/5 bg-white p-6 shadow-sm hover:border-moezia-red/40 transition-colors"
          >
            <p className="text-xs text-moezia-dark/50">
              {new Date(noticia.data).toLocaleDateString("pt-BR")}
              {noticia.autor ? ` · ${noticia.autor}` : ""}
            </p>
            <h2 className="mt-1 font-serif text-xl">{noticia.titulo}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-moezia-dark/70">
              {noticia.conteudo}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
