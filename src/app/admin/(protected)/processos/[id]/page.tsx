import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/StatusBadge";
import ProcessTimeline from "@/components/ProcessTimeline";
import NovoAndamentoForm from "./NovoAndamentoForm";

export const dynamic = "force-dynamic";

export default async function AdminProcessoDetailPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient();

  const { data: processo } = await supabase
    .from("processos")
    .select("*, usuarios ( nome, email )")
    .eq("id", params.id)
    .single();

  if (!processo) return notFound();

  const { data: andamentos } = await supabase
    .from("andamentos")
    .select("*")
    .eq("processo_id", processo.id)
    .order("data", { ascending: false });

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-moezia-dark/50">
        {processo.tipo ?? "Processo"} · {(processo as any).usuarios?.nome ?? (processo as any).usuarios?.email}
      </p>
      <div className="mt-1 flex items-center gap-4">
        <h1 className="font-mono text-lg">{processo.numero}</h1>
        <StatusBadge status={processo.status_atual} />
      </div>
      {processo.descricao && (
        <p className="mt-2 max-w-2xl text-moezia-dark/70">{processo.descricao}</p>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-xl">Histórico e Andamentos</h2>
          <div className="mt-6">
            <ProcessTimeline andamentos={andamentos ?? []} />
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl">Registrar novo andamento</h2>
          <div className="mt-4">
            <NovoAndamentoForm processoId={processo.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
