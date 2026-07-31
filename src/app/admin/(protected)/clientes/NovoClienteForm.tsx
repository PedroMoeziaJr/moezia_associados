"use client";

import { criarCliente } from "@/lib/actions/admin";

export default function NovoClienteForm() {
  return (
    <form
      action={async (formData) => {
        await criarCliente(formData);
      }}
      className="mt-4 space-y-3 rounded-lg border border-black/5 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="block text-xs font-medium">Nome</label>
        <input
          name="nome"
          required
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">E-mail</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium">Senha provisória</label>
        <input
          name="senha"
          type="password"
          required
          minLength={8}
          className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-moezia-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-moezia-red-dark"
      >
        Criar cliente
      </button>
    </form>
  );
}
