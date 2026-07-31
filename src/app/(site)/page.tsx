import Link from "next/link";
import { advogados, areasDeAtuacao } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <section className="bg-moezia-dark text-white">
        <div className="container-page py-24 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-moezia-red">
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
        <h2 className="font-serif text-3xl text-center">Áreas de Atuação</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areasDeAtuacao.map((area) => (
            <div
              key={area.slug}
              className="rounded-lg border border-black/5 bg-white p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg text-moezia-red">{area.nome}</h3>
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
          <h2 className="font-serif text-3xl text-center">Nossos Advogados</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {advogados.map((adv) => (
              <div key={adv.slug} className="rounded-lg border border-black/5 p-6">
                <h3 className="font-serif text-xl">{adv.nome}</h3>
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
    </>
  );
}
