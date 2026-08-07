import type { Metadata } from "next";
import Link from "next/link";
import {
  solucoesJuridicas,
  solucoesComplementares,
  etapasMetodologia,
  principiosUsoIA,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Soluções Jurídicas | Moézia Associados",
  description:
    "Assessoria jurídica apoiada por dados e tecnologia nas áreas de inteligência jurídica, governança de IA, proteção de dados e acompanhamento processual digital.",
};

export default function SolucoesJuridicasPage() {
  return (
    <>
      <section className="bg-moezia-dark text-white">
        <div className="container-page py-16 text-center sm:py-20 lg:py-24">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-moezia-red">
            Direito, dados e tecnologia
          </p>
          <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
            Soluções jurídicas orientadas por dados
          </h1>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/70">
            Utilizamos recursos de inteligência jurídica, análise de dados e tecnologia
            para apoiar decisões, organizar informações e tornar a prestação jurídica
            mais clara, preventiva e estratégica.
          </p>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="font-serif text-4xl text-center">Principais soluções</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center leading-relaxed text-moezia-dark/70">
          As soluções são estruturadas conforme as necessidades jurídicas de cada
          cliente. Dados, painéis e recursos de inteligência artificial podem ser
          utilizados como instrumentos auxiliares, sempre com análise e supervisão
          profissional.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {solucoesJuridicas.map((solucao) => (
            <div
              key={solucao.slug}
              className="flex flex-col rounded-lg border border-black/10 bg-white p-8 shadow-sm"
            >
              <h3 className="font-serif text-2xl text-moezia-red">{solucao.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-moezia-dark/70">{solucao.descricaoCurta}</p>
              <ul className="mt-5 flex-1 space-y-2 text-sm text-moezia-dark/80">
                {solucao.itens.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-moezia-red">•</span> {item}
                  </li>
                ))}
              </ul>
              {solucao.observacao && (
                <p className="mt-5 border-t border-black/5 pt-4 text-sm text-moezia-dark/50">
                  {solucao.observacao}
                </p>
              )}
              {solucao.portalCta && (
                <Link
                  href="/portal/login"
                  className="mt-5 inline-block rounded-full border border-moezia-red px-5 py-2 text-center text-sm font-semibold text-moezia-red hover:bg-moezia-red hover:text-white transition-colors"
                >
                  Acessar Portal do Cliente
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-page">
          <h2 className="font-serif text-4xl text-center">Soluções complementares</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {solucoesComplementares.map((solucao) => (
              <div
                key={solucao.titulo}
                className="rounded-lg border border-black/5 bg-white p-6 shadow-sm"
              >
                <h3 className="font-serif text-lg text-moezia-red">{solucao.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-moezia-dark/70">{solucao.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <h2 className="font-serif text-4xl text-center">Como funciona</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {etapasMetodologia.map((etapa) => (
            <div key={etapa.numero}>
              <span className="font-serif text-3xl text-moezia-red">{etapa.numero}</span>
              <h3 className="mt-2 font-serif text-lg">{etapa.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-moezia-dark/70">{etapa.texto}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-moezia-dark/60">
          A tecnologia auxilia a organização e a análise das informações, mas não
          substitui a avaliação jurídica nem a responsabilidade profissional do
          advogado.
        </p>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container-page max-w-3xl">
          <h2 className="font-serif text-4xl text-center">
            Uso responsável de inteligência artificial
          </h2>
          <p className="mt-6 text-center leading-relaxed text-moezia-dark/70">
            Recursos de inteligência artificial podem ser utilizados para auxiliar na
            organização, classificação, pesquisa e elaboração inicial de conteúdos.
            Toda utilização deve observar a confidencialidade, a proteção de dados
            pessoais, o sigilo profissional e a necessidade de revisão humana.
          </p>
          <ul className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            {principiosUsoIA.map((principio) => (
              <li
                key={principio}
                className="flex gap-2 rounded-md border border-black/5 px-4 py-3 text-sm text-moezia-dark/80"
              >
                <span className="text-moezia-red">•</span> {principio}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-moezia-dark text-white">
        <div className="container-page py-16 text-center sm:py-20 lg:py-24">
          <h2 className="font-serif text-3xl sm:text-4xl">
            Assessoria jurídica apoiada por informação e tecnologia
          </h2>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-white/70">
            Cada projeto é definido a partir do contexto jurídico do cliente. O uso de
            dados, painéis ou recursos de inteligência artificial depende da natureza
            da demanda e das informações disponíveis.
          </p>
          <div className="mt-8">
            <Link
              href="/contato"
              className="inline-block rounded-full bg-moezia-red px-8 py-3 text-sm font-semibold hover:bg-moezia-red-dark transition-colors"
            >
              Entre em contato
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
