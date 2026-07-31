import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/StatusBadge";
import NovoProcessoForm from "./NovoProcessoForm";

export const dynamic = "force-dynamic";

export default async function AdminProcessosPage() {
  const supabase = createServerSupabaseClient();

  const { data: processos } = await supabase
    .from("processos")
    .select("*, usuarios ( nome, email )")
    .order("created_at", { ascending: false });

  const { data: clientes } = await supabase
    .from("usuarios")
    .select("id, nome, email")
    .eq("tipo", "cliente")
    .order("nome", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Processos</h1>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {processos?.map((processo: any) => (
            <Link
              key={processo.id}
              href={`/admin/processos/${processo.id}`}
              className="flex flex-col gap-2 rounded-lg border border-black/5 bg-white p-6 shadow-sm hover:border-moezia-red/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-moezia-dark/50">
                  {processo.tipo ?? "Processo"} · {processo.usuarios?.nome ?? processo.usuarios?.email}
                </p>
                <p className="mt-1 font-mono text-sm">{processo.numero}</p>
              </div>
              <StatusBadge status={processo.status_atual} />
            </Link>
          ))}
          {(!processos || processos.length === 0) && (
            <p className="text-moezia-dark/60">Nenhum processo cadastrado.</p>
          )}
        </div>

        <div>
          <h2 className="font-serif text-lg">Novo Processo</h2>
          <NovoProcessoForm clientes={clientes ?? []} />
        </div>
      </div>
    </div>
  );
}
