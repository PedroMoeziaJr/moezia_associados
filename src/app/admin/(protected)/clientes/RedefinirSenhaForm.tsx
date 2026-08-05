"use client";

import { useState } from "react";
import { redefinirSenhaCliente } from "@/lib/actions/admin";

export default function RedefinirSenhaForm({ usuarioId }: { usuarioId: string }) {
  const [aberto, setAberto] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  if (!aberto) {
    return (
      <button
        onClick={() => setAberto(true)}
        className="text-sm font-medium text-moezia-red hover:underline"
      >
        Redefinir senha
      </button>
    );
  }

  return (
    <form
      action={async (formData) => {
        setEnviando(true);
        await redefinirSenhaCliente(usuarioId, formData);
        setEnviando(false);
        setSucesso(true);
        setTimeout(() => {
          setSucesso(false);
          setAberto(false);
        }, 2000);
      }}
      className="mt-2 flex items-center gap-2"
    >
      <input
        type="password"
        name="nova_senha"
        placeholder="Nova senha (mín. 8 caracteres)"
        required
        minLength={8}
        className="w-full max-w-[220px] rounded-md border border-black/10 px-2 py-1 text-sm focus:border-moezia-red focus:outline-none"
      />
      <button
        type="submit"
        disabled={enviando}
        className="rounded-full bg-moezia-red px-3 py-1 text-xs font-semibold text-white hover:bg-moezia-red-dark disabled:opacity-60"
      >
        {enviando ? "Salvando..." : sucesso ? "Salvo!" : "Salvar"}
      </button>
      <button
        type="button"
        onClick={() => setAberto(false)}
        className="text-xs text-moezia-dark/50 hover:text-moezia-dark"
      >
        Cancelar
      </button>
    </form>
  );
}
