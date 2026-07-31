"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { autoCommit } from "@/lib/git-commit";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/admin/login");
  }
  return session;
}

export async function criarAndamento(processoId: string, formData: FormData) {
  await requireAdmin();
  const supabase = createServerSupabaseClient();

  const tipo = String(formData.get("tipo") ?? "");
  const descricaoPublica = String(formData.get("descricao_publica") ?? "");
  const explicacao = String(formData.get("explicacao") ?? "");
  const data = String(formData.get("data") ?? new Date().toISOString().slice(0, 10));
  const novoStatus = String(formData.get("novo_status") ?? "");

  const { data: processo } = await supabase
    .from("processos")
    .select("numero")
    .eq("id", processoId)
    .single();

  await supabase.from("andamentos").insert({
    processo_id: processoId,
    tipo,
    descricao_publica: descricaoPublica,
    explicacao,
    data,
  });

  if (novoStatus) {
    await supabase.from("processos").update({ status_atual: novoStatus }).eq("id", processoId);
  }

  await autoCommit(
    `update: andamento processo ${processo?.numero ?? processoId} - ${novoStatus || "sem mudança de status"} - ${data}`
  );

  revalidatePath(`/admin/processos/${processoId}`);
  revalidatePath(`/portal/processo/${processoId}`);
}

export async function criarProcesso(formData: FormData) {
  await requireAdmin();
  const supabase = createServerSupabaseClient();

  await supabase.from("processos").insert({
    numero: String(formData.get("numero") ?? ""),
    tipo: String(formData.get("tipo") ?? ""),
    descricao: String(formData.get("descricao") ?? ""),
    cliente_id: String(formData.get("cliente_id") ?? ""),
    status_atual: String(formData.get("status_atual") ?? "Distribuído"),
  });

  revalidatePath("/admin/processos");
}

export async function criarCliente(formData: FormData) {
  await requireAdmin();
  const supabase = createServerSupabaseClient();

  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  const nome = String(formData.get("nome") ?? "");
  const senha = String(formData.get("senha") ?? "");

  const senhaHash = await bcrypt.hash(senha, 10);

  await supabase.from("usuarios").insert({
    email,
    nome,
    senha_hash: senhaHash,
    tipo: "cliente",
  });

  revalidatePath("/admin/clientes");
}

export async function criarNoticia(formData: FormData) {
  await requireAdmin();
  const session = await getServerSession(authOptions);
  const supabase = createServerSupabaseClient();

  const titulo = String(formData.get("titulo") ?? "");
  const slug = titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  await supabase.from("noticias").insert({
    titulo,
    slug,
    conteudo: String(formData.get("conteudo") ?? ""),
    autor: session?.user?.name ?? "Moézia Associados",
    data: new Date().toISOString().slice(0, 10),
  });

  await autoCommit(`docs: adicionar nova notícia "${titulo}"`);

  revalidatePath("/admin/noticias");
  revalidatePath("/blog");
}

export async function atualizarNoticia(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = createServerSupabaseClient();

  await supabase
    .from("noticias")
    .update({
      titulo: String(formData.get("titulo") ?? ""),
      conteudo: String(formData.get("conteudo") ?? ""),
    })
    .eq("id", id);

  revalidatePath("/admin/noticias");
  revalidatePath("/blog");
}

export async function excluirNoticia(id: string) {
  await requireAdmin();
  const supabase = createServerSupabaseClient();
  await supabase.from("noticias").delete().eq("id", id);
  revalidatePath("/admin/noticias");
  revalidatePath("/blog");
}
