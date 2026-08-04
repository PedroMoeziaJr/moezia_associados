import type { Andamento, Documento } from "@/types/supabase";
import { explicarAndamento } from "@/lib/status-explanations";

type DocumentoComUrl = Documento & { url: string | null };

export default function ProcessTimeline({
  andamentos,
  documentos = [],
}: {
  andamentos: Andamento[];
  documentos?: DocumentoComUrl[];
}) {
  const ordenados = [...andamentos].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  if (ordenados.length === 0) {
    return <p className="text-sm text-moezia-dark/60">Nenhum andamento registrado ainda.</p>;
  }

  return (
    <ol className="relative border-l-2 border-moezia-red/20 pl-6">
      {ordenados.map((andamento, index) => {
        const documentosDoAndamento = documentos.filter(
          (doc) => doc.andamento_id === andamento.id
        );

        return (
          <li key={andamento.id} className="mb-8 last:mb-0">
            <span
              className={`absolute -left-[9px] h-4 w-4 rounded-full border-2 border-white ${
                index === 0 ? "bg-moezia-red" : "bg-moezia-red/40"
              }`}
            />
            <p className="text-xs font-medium text-moezia-dark/50">
              {new Date(andamento.data).toLocaleDateString("pt-BR")}
            </p>
            <p className="mt-1 font-medium text-moezia-dark">
              {andamento.descricao_publica}
            </p>
            <p className="mt-1 text-sm text-moezia-dark/70">
              {explicarAndamento(andamento.tipo, andamento.explicacao)}
            </p>
            {andamento.proximos_passos && (
              <div className="mt-2 rounded-md bg-moezia-red/5 px-3 py-2">
                <p className="text-xs font-semibold text-moezia-red">Próximos passos</p>
                <p className="mt-0.5 text-sm text-moezia-dark/70">{andamento.proximos_passos}</p>
              </div>
            )}
            {documentosDoAndamento.length > 0 && (
              <ul className="mt-2 space-y-1.5">
                {documentosDoAndamento.map((doc) =>
                  doc.url ? (
                    <li key={doc.id}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={doc.nome_arquivo}
                        className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-1.5 text-sm hover:border-moezia-red/40"
                      >
                        📄 {doc.nome_arquivo}
                        <span className="text-xs text-moezia-red">Baixar</span>
                      </a>
                    </li>
                  ) : (
                    <li key={doc.id} className="text-sm text-moezia-dark/40">
                      {doc.nome_arquivo}
                    </li>
                  )
                )}
              </ul>
            )}
          </li>
        );
      })}
    </ol>
  );
}
