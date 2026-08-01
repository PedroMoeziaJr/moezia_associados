"use client";

import { useRouter } from "next/navigation";
import type { Noticia } from "@/types/supabase";
import { atualizarNoticia } from "@/lib/actions/admin";

export default function EditarNoticiaForm({ noticia }: { noticia: Noticia }) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await atualizarNoticia(noticia.id, formData);
        router.push("/admin/noticias");
      }}
      className="mt-8 space-y-4 rounded-lg border border-black/5 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input
          name="titulo"
          required
          defaultValue={noticia.titulo}
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">
          URL da imagem de capa (opcional)
        </label>
        <input
          name="imagem_url"
          defaultValue={noticia.imagem_url ?? ""}
          placeholder="/nome-do-arquivo.png"
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Conteúdo (aceita Markdown: links, listas)</label>
        <textarea
          name="conteudo"
          required
          rows={10}
          defaultValue={noticia.conteudo}
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-full bg-moezia-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-moezia-red-dark"
      >
        Salvar alterações
      </button>
    </form>
  );
}
