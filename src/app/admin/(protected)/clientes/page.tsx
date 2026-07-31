import { createServerSupabaseClient } from "@/lib/supabase/server";
import NovoClienteForm from "./NovoClienteForm";

export const dynamic = "force-dynamic";

export default async function AdminClientesPage() {
  const supabase = createServerSupabaseClient();
  const { data: clientes } = await supabase
    .from("usuarios")
    .select("id, nome, email, created_at")
    .eq("tipo", "cliente")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl">Clientes</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {clientes?.map((cliente) => (
            <div
              key={cliente.id}
              className="rounded-lg border border-black/5 bg-white p-6 shadow-sm"
            >
              <p className="font-medium">{cliente.nome ?? "(sem nome)"}</p>
              <p className="text-sm text-moezia-dark/60">{cliente.email}</p>
            </div>
          ))}
          {(!clientes || clientes.length === 0) && (
            <p className="text-moezia-dark/60">Nenhum cliente cadastrado ainda.</p>
          )}
        </div>

        <div>
          <h2 className="font-serif text-lg">Novo Cliente</h2>
          <NovoClienteForm />
        </div>
      </div>
    </div>
  );
}
