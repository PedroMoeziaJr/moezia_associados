# Moézia Associados

Site institucional + portal do cliente + painel administrativo do escritório
**Moézia Associados** (Advocacia e Assessoria Jurídica).

- **Site público**: Home, Advogados, Áreas de Atuação, Notícias (blog), Contato.
- **Portal do Cliente** (`/portal`): login próprio, lista de processos, detalhe do
  processo com status em destaque, explicação em linguagem simples, timeline
  visual dos andamentos, histórico completo e documentos para download.
- **Painel Administrativo** (`/admin`): login próprio, atualização de
  andamentos de processos, gestão de notícias e cadastro de clientes.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Postgres + Storage)
- [NextAuth.js](https://next-auth.js.org/) (Credentials Provider)

## Estrutura do banco de dados

| Tabela        | Descrição                                                   |
| ------------- | ------------------------------------------------------------ |
| `usuarios`    | Contas de acesso (`tipo`: `cliente` ou `admin`), senha com hash bcrypt |
| `processos`   | Processos vinculados a um cliente (`cliente_id`)              |
| `andamentos`  | Histórico de andamentos de cada processo                     |
| `documentos`  | Documentos compartilhados com o cliente (Supabase Storage)    |
| `noticias`    | Notícias jurídicas exibidas no blog público                   |

As migrations estão em [`supabase/migrations`](supabase/migrations).

## Setup

### 1. Pré-requisitos

- Node.js 18.18+ (recomendado: LTS)
- Uma conta [Supabase](https://supabase.com/) (plano free é suficiente)

### 2. Clonar e instalar dependências

```bash
git clone https://github.com/PedroMoeziaJr/moezia_associados.git
cd moezia_associados
npm install
```

### 3. Configurar o Supabase

1. Crie um projeto novo em [supabase.com](https://supabase.com/dashboard).
2. No SQL Editor do projeto, rode os arquivos de `supabase/migrations/` **em ordem**:
   - `0001_init.sql` — cria as tabelas e habilita RLS
   - `0002_seed_test_data.sql` — cria um usuário admin, um cliente de teste e um
     processo de exemplo (ver credenciais abaixo)
   - `0003_storage_bucket.sql` — cria o bucket de storage para documentos
3. Em **Project Settings > API**, copie a `Project URL`, a chave `anon public`
   e a chave `service_role`.

### 4. Configurar variáveis de ambiente

Copie o modelo e preencha com os valores reais:

```bash
cp .env.example .env.local
```

Preencha `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` e gere um `NEXTAUTH_SECRET` (`openssl rand -base64 32`).

### 5. Rodar localmente

```bash
npm run dev
```

Acesse http://localhost:3000.

### Credenciais de teste (seed)

> ⚠️ Troque essas senhas antes de qualquer uso real. Elas existem apenas para
> testar o fluxo localmente.

| Painel                  | E-mail                              | Senha       |
| ----------------------- | ------------------------------------ | ----------- |
| Portal do Cliente       | `pdroivojr@gmail.com`                 | `teste123`  |
| Área Administrativa     | `admin@moeziaassociados.adv.br`       | `admin123`  |

O processo de teste (`0705933-76.2026.8.07.0018`) já vem com 3 andamentos de
exemplo vinculados ao cliente de teste.

## Como atualizar andamentos de processos

Veja o guia completo em [`GUIA_ADMIN.md`](GUIA_ADMIN.md). Resumo: faça login em
`/admin/login`, abra o processo em `/admin/processos`, preencha o formulário de
"Registrar novo andamento". Isso salva no Supabase e, se você estiver rodando
localmente (`ENABLE_AUTO_GIT_COMMIT=true`), cria automaticamente um commit git
com a mensagem `update: andamento processo [numero] - [status] - [data]`.

**Importante**: o commit automático só funciona quando o app roda contra um
diretório com um repositório git real no disco (dev local ou servidor próprio
sempre ligado). Em hospedagem serverless (Vercel, Netlify, etc.) o sistema de
arquivos é efêmero/read-only em produção, então o commit automático é
silenciosamente ignorado nesses ambientes — os dados continuam sendo salvos
normalmente no Supabase, só não gera commit de código.

## Versionamento / Branches

- `main` — versão de produção (estável)
- `develop` — desenvolvimento
- `feature/*` — novas funcionalidades

Padrão de commits:

- `feat: ...` — nova funcionalidade
- `docs: ...` — documentação/notícias
- `update: ...` — atualização de dados (ex: andamentos, gerado automaticamente)
- `fix: ...` — correção de bug

## Deploy

Este projeto foi iniciado para rodar **localmente**. Para colocar em produção:

1. Escolha uma hospedagem (Vercel é o caminho mais simples para Next.js).
2. Configure as mesmas variáveis de `.env.local` nas variáveis de ambiente da
   hospedagem.
3. Se for usar hospedagem serverless, lembre-se de que o auto-commit local
   **não roda em produção** (veja seção acima) — os andamentos continuam
   sendo salvos no banco normalmente, apenas sem o commit de auditoria em git.
   Se quiser um trilha de auditoria completa em produção serverless, a
   alternativa é usar a API do GitHub para criar commits remotos (não
   implementado nesta versão).
4. Antes de ir para produção: troque as senhas de teste, gere um
   `NEXTAUTH_SECRET` novo e revise o `npm audit` (existem avisos de
   segurança conhecidos do Next.js 14 que exigem migrar para uma versão
   major mais nova — rode `npm audit` para ver o status atual).

## Documentação adicional

- [`GUIA_ADMIN.md`](GUIA_ADMIN.md) — como usar o painel administrativo
- [`CHANGELOG.md`](CHANGELOG.md) — histórico de mudanças
