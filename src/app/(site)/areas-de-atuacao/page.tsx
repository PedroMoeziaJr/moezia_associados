import type { Metadata } from "next";
import Link from "next/link";
import { areasDeAtuacao } from "@/lib/content";

export const metadata: Metadata = {
  title: "Áreas de Atuação | Moézia Associados",
};

export default function AreasDeAtuacaoPage() {
  return (
    <div className="container-page py-12 sm:py-16 lg:py-20">
      <h1 className="font-serif text-4xl sm:text-5xl">Áreas de Atuação</h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-moezia-dark/70">
        Atuamos nas seguintes áreas do direito, com atendimento técnico e
        personalizado.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {areasDeAtuacao.map((area) => (
          <div
            key={area.slug}
            className="rounded-lg border border-black/5 bg-white p-6 shadow-sm"
          >
            <h2 className="font-serif text-2xl text-moezia-red">{area.nome}</h2>
            <p className="mt-2 text-sm leading-relaxed text-moezia-dark/70">{area.descricao}</p>
            <ul className="mt-4 space-y-1 text-sm text-moezia-dark/80">
              {area.topicos.map((topico) => (
                <li key={topico} className="flex gap-2">
                  <span className="text-moezia-red">•</span> {topico}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/solucoes-juridicas" className="text-moezia-red font-medium hover:underline">
          Conheça também nossas soluções jurídicas orientadas por dados →
        </Link>
      </div>
    </div>
  );
}
