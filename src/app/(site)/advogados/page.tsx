import type { Metadata } from "next";
import { advogados } from "@/lib/content";

export const metadata: Metadata = {
  title: "Advogados | Moézia Associados",
};

export default function AdvogadosPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-serif text-5xl">Advogados</h1>
      <p className="mt-3 max-w-2xl text-moezia-dark/70">
        Conheça os sócios do Moézia Associados e suas áreas de especialização.
      </p>

      <div className="mt-12 space-y-10">
        {advogados.map((adv) => (
          <div
            key={adv.slug}
            className="rounded-lg border border-black/5 bg-white p-8 shadow-sm"
          >
            <h2 className="font-serif text-3xl">{adv.nome}</h2>
            <p className="mt-1 text-sm font-medium text-moezia-red">{adv.titulo}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {adv.especialidades.map((esp) => (
                <span
                  key={esp}
                  className="rounded-full bg-moezia-red/10 px-3 py-1 text-xs font-medium text-moezia-red"
                >
                  {esp}
                </span>
              ))}
            </div>
            <p className="mt-4 text-moezia-dark/70">{adv.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
