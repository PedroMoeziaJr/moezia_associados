-- Bucket de storage para documentos compartilhados com clientes no portal.
-- Privado: acesso apenas via signed URLs gerados pelo server (service_role).
insert into storage.buckets (id, name, public)
values ('documentos-processos', 'documentos-processos', false)
on conflict (id) do nothing;
