import Image from "next/image";
import Link from "next/link";
import { advogados, areasDeAtuacao } from "@/lib/content";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type NoticiaCard = {
  slug: string;
  titulo: string;
  conteudo: string;
  data: string;
  autor: string | null;
  imagem_url: string | null;
};

/** Strips basic Markdown syntax so card previews show plain, readable text. */
function markdownToExcerpt(conteudo: string) {
  return conteudo
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^[*-]\s+/gm, "")
    .replace(/[#*_`]/g, "")
    .trim();
}

async function getNoticias() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("noticias")
      .select("slug, titulo, conteudo, data, autor, imagem_url")
      .order("data", { ascending: false })
      .limit(6);
    if (error) throw error;
    return { noticias: (data ?? []) as NoticiaCard[], erro: null as string | null };
  } catch {
    return {
      noticias: [] as NoticiaCard[],
      erro: "Não foi possível carregar as notícias no momento.",
    };
  }
}

export default async function HomePage() {
  const { noticias, erro } = await getNoticias();

  return (
    <>
      <section className="bg-moezia-dark text-white">
        <div className="container-page py-24 text-center">
          <p className="mb-3 text-lg uppercase tracking-[0.3em] text-moezia-red">
            Advocacia e Assessoria Jurídica
          </p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            Moézia Associados
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-white/70">
            Direito Digital, LGPD, Direito Civil e Direito Militar com atendimento
            próximo, técnico e transparente.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contato"
              className="rounded-full bg-moezia-red px-6 py-3 text-sm font-semibold hover:bg-moezia-red-dark transition-colors"
            >
              Fale Conosco
            </Link>
            <Link
              href="/portal/login"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Portal do Cliente
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="font-serif text-4xl text-center">Áreas de Atuação</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areasDeAtuacao.map((area) => (
            <div
              key={area.slug}
              className="rounded-lg border border-black/5 bg-white p-6 shadow-sm"
            >
              <h3 className="font-serif text-xl text-moezia-red">{area.nome}</h3>
              <p className="mt-2 text-sm text-moezia-dark/70">{area.descricao}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/areas-de-atuacao" className="text-moezia-red font-medium hover:underline">
            Ver todas as áreas de atuação →
          </Link>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <h2 className="font-serif text-4xl text-center">Direito, dados e tecnologia</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-moezia-dark/70">
            O Moézia Associados utiliza recursos de organização de dados e tecnologia
            para apoiar a prestação jurídica, facilitar o acompanhamento dos casos e
            oferecer informações mais claras para pessoas e empresas.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-black/5 bg-moezia-cream p-6">
              <h3 className="font-serif text-lg text-moezia-red">Inteligência Jurídica</h3>
              <p className="mt-2 text-sm text-moezia-dark/70">
                Análise de processos, contratos e riscos apoiada por dados e
                indicadores.
              </p>
            </div>
            <div className="rounded-lg border border-black/5 bg-moezia-cream p-6">
              <h3 className="font-serif text-lg text-moezia-red">Governança de IA e Dados</h3>
              <p className="mt-2 text-sm text-moezia-dark/70">
                Assessoria jurídica em LGPD, inteligência artificial, privacidade e
                contratos tecnológicos.
              </p>
            </div>
            <div className="rounded-lg border border-black/5 bg-moezia-cream p-6">
              <h3 className="font-serif text-lg text-moezia-red">Acompanhamento Digital</h3>
              <p className="mt-2 text-sm text-moezia-dark/70">
                Atualizações processuais, documentos e informações organizadas por
                meio do Portal do Cliente.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link href="/solucoes-juridicas" className="text-moezia-red font-medium hover:underline">
              Conheça nossas soluções jurídicas →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-moezia-cream py-20">
        <div className="container-page">
          <h2 className="font-serif text-4xl text-center">Nossos Advogados</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {advogados.map((adv) => (
              <div key={adv.slug} className="rounded-lg border border-black/5 bg-white p-6">
                <h3 className="font-serif text-2xl">{adv.nome}</h3>
                <p className="text-sm text-moezia-red">{adv.titulo}</p>
                <p className="mt-3 text-sm text-moezia-dark/70">{adv.bio}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/advogados" className="text-moezia-red font-medium hover:underline">
              Conheça a equipe →
            </Link>
          </div>
        </div>
      </section>

      <section id="noticias" className="container-page py-20 scroll-mt-20">
        <h2 className="font-serif text-4xl text-center">Notícias e Artigos</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-moezia-dark/70">
          Conteúdos e atualizações jurídicas produzidos pelo Moézia Associados.
        </p>

        {erro && (
          <p className="mx-auto mt-10 max-w-xl rounded-md bg-yellow-50 p-4 text-center text-sm text-yellow-800">
            {erro} Verifique se o Supabase está configurado (.env.local).
          </p>
        )}

        {!erro && noticias.length === 0 && (
          <p className="mt-10 text-center text-moezia-dark/60">
            Nenhuma notícia publicada ainda.
          </p>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia) => (
            <Link
              key={noticia.slug}
              href={`/blog/${noticia.slug}`}
              className="flex flex-col overflow-hidden rounded-lg border border-black/5 bg-white shadow-sm hover:border-moezia-red/40 transition-colors"
            >
              {noticia.imagem_url && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={noticia.imagem_url}
                    alt={noticia.titulo}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-moezia-dark/50">
                  {new Date(noticia.data).toLocaleDateString("pt-BR")}
                  {noticia.autor ? ` · ${noticia.autor}` : ""}
                </p>
                <h3 className="mt-1 font-serif text-lg">{noticia.titulo}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-moezia-dark/70">
                  {markdownToExcerpt(noticia.conteudo)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
