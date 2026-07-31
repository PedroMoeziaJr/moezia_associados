"use client";

import { criarProcesso } from "@/lib/actions/admin";

type Cliente = { id: string; nome: string | null; email: string };

export default function NovoProcessoForm({ clientes }: { clientes: Cliente[] }) {
  return (
    <form
      action={async (formData) => {
        await criarProcesso(formData);
      }}
      className="mt-4 space-y-3 rounded-lg border border-black/5 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block text-xs font-medium">Número do processo</label>
        <input
          name="numero"
          required
          placeholder="0000000-00.0000.0.00.0000"
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Tipo</label>
        <input
          name="tipo"
          placeholder="Ação Civil"
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Cliente</label>
        <select
          name="cliente_id"
          required
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        >
          <option value="">Selecione...</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome ?? cliente.email}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium">Descrição</label>
        <textarea
          name="descricao"
          rows={3}
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Status inicial</label>
        <input
          name="status_atual"
          defaultValue="Distribuído"
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-moezia-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-moezia-red-dark"
      >
        Criar processo
      </button>
    </form>
  );
}
