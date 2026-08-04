-- Dados de teste: usuario admin, cliente de teste e um processo real de exemplo.
-- IMPORTANTE: troque essas senhas antes de qualquer uso real/producao.
-- Senhas em texto puro (apenas para referencia do desenvolvedor):
--   cliente teste (pdroivojr@gmail.com): teste123
--   admin teste   (admin@moeziaassociados.adv.br): admin123

insert into usuarios (email, senha_hash, tipo, nome) values
  ('admin@moeziaassociados.adv.br', '$2a$10$Yu1UViRTfvBXUu2rAna.wuYCGK05DspvzEPccjPDecPvr8ojdm/5i', 'admin', 'Pedro Ivo Moézia de Lima Junior'),
  ('pdroivojr@gmail.com', '$2a$10$4quRdKwYF0Sxy9ls64WoSumY1pv/UxXhj3c6yzbRzWzX9zvQaNJZ6', 'cliente', 'Pedro Ivo (Cliente Teste)')
on conflict (email) do nothing;

insert into processos (numero, tipo, cliente_id, descricao, status_atual)
select
  '0705933-76.2026.8.07.0018',
  'Ação Civil',
  usuarios.id,
  'Ação civil movida contra o Bradesco em razão de transações não autorizadas decorrentes de phishing.',
  'Aguardando manifestação da parte contrária'
from usuarios
where usuarios.email = 'pdroivojr@gmail.com'
on conflict (numero) do nothing;

insert into andamentos (processo_id, data, tipo, descricao_publica, explicacao)
select
  processos.id,
  '2026-02-10'::date,
  'distribuido',
  'Processo distribuído para a 18ª Vara Cível de Brasília.',
  null
from processos
where processos.numero = '0705933-76.2026.8.07.0018'
union all
select
  processos.id,
  '2026-03-05'::date,
  'citacao',
  'Bradesco foi citado para apresentar defesa.',
  null
from processos
where processos.numero = '0705933-76.2026.8.07.0018'
union all
select
  processos.id,
  '2026-04-20'::date,
  'contestacao',
  'Bradesco apresentou contestação alegando culpa exclusiva do titular da conta.',
  'O banco negou responsabilidade pelas transações. Nosso próximo passo é apresentar réplica rebatendo os argumentos.'
from processos
where processos.numero = '0705933-76.2026.8.07.0018';
