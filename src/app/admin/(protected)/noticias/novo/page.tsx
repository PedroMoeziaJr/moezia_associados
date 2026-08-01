"use client";

import { useRouter } from "next/navigation";
import { criarNoticia } from "@/lib/actions/admin";

export default function NovaNoticiaPage() {
  const router = useRouter();

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl">Nova Notícia</h1>
      <form
        action={async (formData) => {
          await criarNoticia(formData);
          router.push("/admin/noticias");
        }}
        className="mt-8 space-y-4 rounded-lg border border-black/5 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium">Título</label>
          <input
            name="titulo"
            required
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            URL da imagem de capa (opcional)
          </label>
          <input
            name="imagem_url"
            placeholder="/nome-do-arquivo.png"
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
          />
          <p className="mt-1 text-xs text-moezia-dark/50">
            Coloque o arquivo de imagem em <code>public/</code> e referencie
            aqui como <code>/nome-do-arquivo.png</code>.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium">Conteúdo (aceita Markdown: links, listas)</label>
          <textarea
            name="conteudo"
            required
            rows={10}
            className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-moezia-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-moezia-red-dark"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}
