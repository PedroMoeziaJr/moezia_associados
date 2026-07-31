import type { Andamento } from "@/types/supabase";
import { explicarAndamento } from "@/lib/status-explanations";

export default function ProcessTimeline({ andamentos }: { andamentos: Andamento[] }) {
  const ordenados = [...andamentos].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  if (ordenados.length === 0) {
    return <p className="text-sm text-moezia-dark/60">Nenhum andamento registrado ainda.</p>;
  }

  return (
    <ol className="relative border-l-2 border-moezia-red/20 pl-6">
      {ordenados.map((andamento, index) => (
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
        </li>
      ))}
    </ol>
  );
}
