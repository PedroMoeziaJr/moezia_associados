# Changelog

Todas as mudanças notáveis do projeto são documentadas neste arquivo.

## [0.1.0] - 2026-07-31

### Adicionado

- Scaffold inicial do projeto Next.js 14 (App Router, TypeScript, Tailwind CSS).
- Site público: Home, Advogados, Áreas de Atuação, Notícias (blog), Contato.
- Autenticação com NextAuth (Credentials Provider) e middleware protegendo
  `/portal` e `/admin` por papel de usuário (`cliente` / `admin`).
- Portal do Cliente: dashboard de processos, página de detalhe com status em
  destaque, explicação em linguagem simples, timeline de andamentos, histórico
  completo e download de documentos via signed URL do Supabase Storage.
- Painel Administrativo: registrar andamentos (com atualização de status),
  criar/editar/excluir notícias, cadastrar processos e clientes.
- Commit git automático local ao registrar andamentos e publicar notícias
  (`src/lib/git-commit.ts`), com fallback silencioso fora de ambiente local.
- Migrations SQL do Supabase (`usuarios`, `processos`, `andamentos`,
  `documentos`, `noticias`), com RLS habilitado e dados de teste (cliente,
  admin e processo de exemplo `0705933-76.2026.8.07.0018`).
- Documentação: `README.md`, `GUIA_ADMIN.md`, `.env.example`.
