-- Moezia Associados - schema inicial
-- Tabelas: usuarios, processos, andamentos, documentos, noticias

create extension if not exists "pgcrypto";

create table if not exists usuarios (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  senha_hash text not null,
  tipo text not null check (tipo in ('cliente', 'admin')),
  nome text,
  created_at timestamptz not null default now()
);

create table if not exists processos (
  id uuid primary key default gen_random_uuid(),
  numero text unique not null,
  tipo text,
  cliente_id uuid not null references usuarios(id) on delete cascade,
  descricao text,
  status_atual text,
  created_at timestamptz not null default now()
);

create index if not exists processos_cliente_id_idx on processos(cliente_id);

create table if not exists andamentos (
  id uuid primary key default gen_random_uuid(),
  processo_id uuid not null references processos(id) on delete cascade,
  data date not null default current_date,
  tipo text,
  descricao_publica text not null,
  explicacao text,
  created_at timestamptz not null default now()
);

create index if not exists andamentos_processo_id_idx on andamentos(processo_id);

create table if not exists documentos (
  id uuid primary key default gen_random_uuid(),
  processo_id uuid not null references processos(id) on delete cascade,
  nome_arquivo text not null,
  caminho_storage text not null,
  created_at timestamptz not null default now()
);

create index if not exists documentos_processo_id_idx on documentos(processo_id);

create table if not exists noticias (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text unique not null,
  conteudo text not null,
  autor text,
  data date not null default current_date,
  created_at timestamptz not null default now()
);

-- Row Level Security: a aplicacao Next.js acessa o banco pela service_role key
-- (server-side, apos validar a sessao via NextAuth), entao habilitamos RLS em
-- todas as tabelas sem policies para o anon/authenticated - isso impede
-- qualquer leitura direta pelo publishable key exposto no browser.
alter table usuarios enable row level security;
alter table processos enable row level security;
alter table andamentos enable row level security;
alter table documentos enable row level security;
alter table noticias enable row level security;

-- Excecao: noticias sao publicas (usadas no blog do site institucional)
-- e podem ser lidas com a anon key, se o front-end optar por isso no futuro.
create policy "Noticias sao publicas para leitura"
  on noticias for select
  to anon, authenticated
  using (true);
