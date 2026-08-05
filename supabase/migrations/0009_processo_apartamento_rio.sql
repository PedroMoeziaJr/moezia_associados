-- Processo real: execucao/cumprimento de sentenca envolvendo imovel e a
-- familia Marques no Rio de Janeiro (27a Vara Civel da Capital/RJ).

insert into processos (numero, tipo, cliente_id, descricao, status_atual)
values (
  '0144590-38.2018.8.19.0001',
  'Procedimento Comum Cível (fase de execução)',
  (select id from usuarios where email = 'pdroivojr@gmail.com'),
  'Processo em trâmite na 27ª Vara Cível da Comarca da Capital do Rio de Janeiro, envolvendo um imóvel e diversos membros da família Marques (incluindo o espólio de Alair Gomes de Azevedo Marques). Pedro Ivo Moézia de Lima figura como parte exequente, buscando localizar bens e valores das partes executadas para satisfação do crédito reconhecido no processo.',
  'Aguardando decisão sobre diligências de busca de bens (SISBAJUD, RENAJUD e quebra de sigilo fiscal) contra as executadas'
)
on conflict (numero) do update set
  tipo = excluded.tipo,
  descricao = excluded.descricao,
  status_atual = excluded.status_atual;

insert into andamentos (processo_id, data, tipo, descricao_publica, explicacao, proximos_passos)
select p.id, v.data, v.tipo, v.descricao_publica, v.explicacao, v.proximos_passos
from processos p
join (
  values
    ('2026-07-09'::date, 'ato_ordinatorio',
     'Ato ordinatório publicado determinando o recolhimento prévio das custas para a prática de novas diligências de penhora e pesquisa de bens contra as executadas (SISBAJUD, RENAJUD e consulta à Receita Federal).',
     'Antes de o juízo realizar novas buscas de dinheiro/bens dos devedores, a lei exige que a parte interessada pague antecipadamente uma taxa por cada consulta a ser feita.',
     'Efetuar o pagamento das custas dentro do prazo.'),
    ('2026-07-16'::date, 'custas_pagas',
     'Custas pagas (R$ 191,52, referentes a 12 consultas/atos) e petição protocolada pedindo: a juntada dos comprovantes, a formalização da habilitação do Dr. Pedro Ivo Moézia de Lima Junior nos autos, e a reiteração das diligências de bloqueio (SISBAJUD "teimosinha"), pesquisa de veículos (RENAJUD) e quebra de sigilo fiscal (declarações de Imposto de Renda) das executadas.',
     'Como a penhora feita anteriormente contra as executadas foi apenas parcial (não cobriu o valor total devido), pedimos ao juízo novas buscas mais amplas de bens e de informações financeiras para tentar localizar patrimônio suficiente para quitar a dívida.',
     'Aguardar a decisão do juízo autorizando as diligências pedidas e a formalização da habilitação do advogado nos autos.')
) as v(data, tipo, descricao_publica, explicacao, proximos_passos) on true
where p.numero = '0144590-38.2018.8.19.0001';
