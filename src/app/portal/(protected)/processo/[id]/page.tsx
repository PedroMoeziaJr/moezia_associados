import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/StatusBadge";
import ProcessTimeline from "@/components/ProcessTimeline";
import { explicarAndamento } from "@/lib/status-explanations";

export const dynamic = "force-dynamic";

export default async function ProcessoDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const supabase = createServerSupabaseClient();

  const { data: processo } = await supabase
    .from("processos")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!processo) return notFound();

  const isOwner = processo.cliente_id === session!.user.id;
  const isAdmin = session!.user.role === "admin";
  if (!isOwner && !isAdmin) {
    redirect("/portal");
  }

  const { data: andamentos } = await supabase
    .from("andamentos")
    .select("*")
    .eq("processo_id", processo.id)
    .order("data", { ascending: false });

  const { data: documentos } = await supabase
    .from("documentos")
    .select("*")
    .eq("processo_id", processo.id)
    .order("created_at", { ascending: false });

  const ultimoAndamento = andamentos?.[0];

  const documentosComUrl = await Promise.all(
    (documentos ?? []).map(async (doc) => {
      const { data: signed } = await supabase.storage
        .from("documentos-processos")
        .createSignedUrl(doc.caminho_storage, 60 * 10);
      return { ...doc, url: signed?.signedUrl ?? null };
    })
  );

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-moezia-dark/50">
        {processo.tipo ?? "Processo"}
      </p>
      <h1 className="mt-1 font-mono text-lg">{processo.numero}</h1>
      {processo.descricao && (
        <p className="mt-2 max-w-2xl text-moezia-dark/70">{processo.descricao}</p>
      )}

      <div className="mt-6 rounded-lg border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-moezia-dark/50">Status atual</p>
        <div className="mt-2">
          <StatusBadge status={processo.status_atual} />
        </div>
        {ultimoAndamento && (
          <p className="mt-4 text-sm text-moezia-dark/70">
            {explicarAndamento(ultimoAndamento.tipo, ultimoAndamento.explicacao)}
          </p>
        )}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-xl">Histórico e Andamentos</h2>
          <div className="mt-6">
            <ProcessTimeline andamentos={andamentos ?? []} />
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl">Documentos</h2>
          {documentosComUrl.length === 0 && (
            <p className="mt-4 text-sm text-moezia-dark/60">
              Nenhum documento compartilhado ainda.
            </p>
          )}
          <ul className="mt-4 space-y-2">
            {documentosComUrl.map((doc) => (
              <li key={doc.id}>
                {doc.url ? (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-md border border-black/10 bg-white px-4 py-2 text-sm hover:border-moezia-red/40"
                  >
                    📄 {doc.nome_arquivo}
                  </a>
                ) : (
                  <span className="text-sm text-moezia-dark/40">{doc.nome_arquivo}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
