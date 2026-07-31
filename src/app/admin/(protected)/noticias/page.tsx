import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import ExcluirNoticiaButton from "./ExcluirNoticiaButton";

export const dynamic = "force-dynamic";

export default async function AdminNoticiasPage() {
  const supabase = createServerSupabaseClient();
  const { data: noticias } = await supabase
    .from("noticias")
    .select("*")
    .order("data", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Notícias</h1>
        <Link
          href="/admin/noticias/novo"
          className="rounded-full bg-moezia-red px-5 py-2 text-sm font-semibold text-white hover:bg-moezia-red-dark"
        >
          + Nova notícia
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {noticias?.map((noticia) => (
          <div
            key={noticia.id}
            className="flex items-center justify-between rounded-lg border border-black/5 bg-white p-6 shadow-sm"
          >
            <div>
              <p className="text-xs text-moezia-dark/50">
                {new Date(noticia.data).toLocaleDateString("pt-BR")}
              </p>
              <p className="font-serif text-lg">{noticia.titulo}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin/noticias/${noticia.id}`}
                className="text-sm font-medium text-moezia-red hover:underline"
              >
                Editar
              </Link>
              <ExcluirNoticiaButton id={noticia.id} />
            </div>
          </div>
        ))}
        {(!noticias || noticias.length === 0) && (
          <p className="text-moezia-dark/60">Nenhuma notícia publicada ainda.</p>
        )}
      </div>
    </div>
  );
}
