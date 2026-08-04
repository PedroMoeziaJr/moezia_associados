"use client";

import { criarAndamento } from "@/lib/actions/admin";

const TIPOS_ANDAMENTO = [
  { value: "distribuido", label: "Distribuído" },
  { value: "citacao", label: "Citação" },
  { value: "contestacao", label: "Contestação" },
  { value: "audiencia_designada", label: "Audiência designada" },
  { value: "audiencia_realizada", label: "Audiência realizada" },
  { value: "sentenca", label: "Sentença" },
  { value: "recurso", label: "Recurso" },
  { value: "transitado_em_julgado", label: "Trânsito em julgado" },
  { value: "cumprimento_sentenca", label: "Cumprimento de sentença" },
  { value: "arquivado", label: "Arquivado" },
  { value: "outro", label: "Outro" },
];

export default function NovoAndamentoForm({ processoId }: { processoId: string }) {
  return (
    <form
      action={async (formData) => {
        await criarAndamento(processoId, formData);
      }}
      className="space-y-3 rounded-lg border border-black/5 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block text-xs font-medium">Tipo de andamento</label>
        <select
          name="tipo"
          required
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        >
          {TIPOS_ANDAMENTO.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium">Data</label>
        <input
          type="date"
          name="data"
          required
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Descrição (visível ao cliente)</label>
        <textarea
          name="descricao_publica"
          required
          rows={2}
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">
          Explicação em linguagem simples (opcional - sobrepõe o texto padrão)
        </label>
        <textarea
          name="explicacao"
          rows={2}
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Próximos passos (opcional)</label>
        <textarea
          name="proximos_passos"
          rows={2}
          placeholder="Ex: Aguardamos o prazo de 15 dias para o banco recorrer da sentença."
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Anexar documento em PDF (opcional)</label>
        <input
          type="file"
          name="documento"
          accept="application/pdf"
          className="mt-1 w-full text-sm text-moezia-dark/70 file:mr-3 file:rounded-full file:border-0 file:bg-moezia-red/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-moezia-red hover:file:bg-moezia-red/20"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">
          Atualizar status atual do processo (opcional)
        </label>
        <input
          name="novo_status"
          placeholder="Ex: Aguardando sentença"
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-moezia-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-moezia-red-dark"
      >
        Registrar andamento
      </button>
    </form>
  );
}
