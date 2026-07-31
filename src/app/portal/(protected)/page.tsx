import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function PortalDashboardPage() {
  const session = await getServerSession(authOptions);
  const supabase = createServerSupabaseClient();

  const { data: processos } = await supabase
    .from("processos")
    .select("*")
    .eq("cliente_id", session!.user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl">Meus Processos</h1>
      <p className="mt-2 text-moezia-dark/70">
        Acompanhe abaixo o andamento de seus processos junto ao Moézia Associados.
      </p>

      {(!processos || processos.length === 0) && (
        <p className="mt-10 rounded-lg border border-black/5 bg-white p-6 text-moezia-dark/60">
          Nenhum processo vinculado à sua conta ainda.
        </p>
      )}

      <div className="mt-8 grid gap-4">
        {processos?.map((processo) => (
          <Link
            key={processo.id}
            href={`/portal/processo/${processo.id}`}
            className="flex flex-col gap-3 rounded-lg border border-black/5 bg-white p-6 shadow-sm hover:border-moezia-red/40 transition-colors sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-moezia-dark/50">
                {processo.tipo ?? "Processo"}
              </p>
              <p className="mt-1 font-mono text-sm">{processo.numero}</p>
              {processo.descricao && (
                <p className="mt-1 text-sm text-moezia-dark/70">{processo.descricao}</p>
              )}
            </div>
            <StatusBadge status={processo.status_atual} />
          </Link>
        ))}
      </div>
    </div>
  );
}
