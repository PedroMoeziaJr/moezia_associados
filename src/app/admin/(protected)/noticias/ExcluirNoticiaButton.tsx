"use client";

import { useTransition } from "react";
import { excluirNoticia } from "@/lib/actions/admin";

export default function ExcluirNoticiaButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Excluir esta notícia?")) {
          startTransition(() => excluirNoticia(id));
        }
      }}
      disabled={isPending}
      className="text-sm font-medium text-moezia-dark/50 hover:text-red-600 disabled:opacity-50"
    >
      Excluir
    </button>
  );
}
