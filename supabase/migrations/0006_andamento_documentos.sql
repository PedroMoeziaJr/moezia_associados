-- Permite anexar um documento (PDF) diretamente a um andamento especifico,
-- junto com uma explicacao dos proximos passos para o cliente.

alter table andamentos
  add column if not exists proximos_passos text;

alter table documentos
  add column if not exists andamento_id uuid references andamentos(id) on delete cascade;

create index if not exists documentos_andamento_id_idx on documentos(andamento_id);
