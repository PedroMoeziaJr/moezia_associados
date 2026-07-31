import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseClient();

  const [{ count: totalProcessos }, { count: totalClientes }, { count: totalNoticias }] =
    await Promise.all([
      supabase.from("processos").select("*", { count: "exact", head: true }),
      supabase.from("usuarios").select("*", { count: "exact", head: true }).eq("tipo", "cliente"),
      supabase.from("noticias").select("*", { count: "exact", head: true }),
    ]);

  const cards = [
    { label: "Processos", value: totalProcessos ?? 0, href: "/admin/processos" },
    { label: "Clientes", value: totalClientes ?? 0, href: "/admin/clientes" },
    { label: "Notícias publicadas", value: totalNoticias ?? 0, href: "/admin/noticias" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl">Painel Administrativo</h1>
      <p className="mt-2 text-moezia-dark/70">Visão geral do escritório.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-black/5 bg-white p-6 shadow-sm hover:border-moezia-red/40"
          >
            <p className="text-3xl font-semibold text-moezia-red">{card.value}</p>
            <p className="mt-1 text-sm text-moezia-dark/70">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
