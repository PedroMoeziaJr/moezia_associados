-- Processo real: acao de familia de Pedro Ivo Moezia de Lima (socio,
-- Direito Civil/Militar) contra a ex-companheira, sobre clausula do FUSEX
-- no acordo de separacao de 2004 (4a Vara de Familia de Brasilia).

insert into processos (numero, tipo, cliente_id, descricao, status_atual)
values (
  '0747388-27.2026.8.07.0016',
  'Ação de Modificação/Extinção de Cláusula de Acordo de Separação Judicial',
  (select id from usuarios where email = 'pdroivojr@gmail.com'),
  'Ação movida por Pedro Ivo Moézia de Lima contra sua ex-companheira Maria Francina Vieira Teixeira, buscando anular a cláusula do acordo de separação de 2004 que a mantém como beneficiária do FUSEX (plano de saúde militar), sob o fundamento de que essa condição de dependente exige pensão alimentícia reconhecida judicialmente - inexistente no caso, já que ambos dispensaram mutuamente os alimentos na época. O débito relacionado a essa cláusula já ultrapassa R$ 157.000,00.',
  'Contestação apresentada pela parte requerida; mediação sem acordo - réplica em preparação'
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
    ('2026-05-25'::date, 'distribuido',
     'Ação distribuída na 4ª Vara de Família de Brasília, pedindo a exclusão de Maria Francina como beneficiária do plano de saúde militar (FUSEX) e o ressarcimento dos valores pagos.',
     'O processo foi oficialmente registrado, com prioridade de tramitação concedida em razão da idade do autor (88 anos).',
     null::text),
    ('2026-05-27'::date, 'emenda_inicial',
     'A juíza determinou a emenda (correção/complementação) da petição inicial.',
     'É uma exigência processual comum antes da citação da outra parte, não uma rejeição do caso.',
     'Apresentar a emenda dentro do prazo.'),
    ('2026-06-10'::date, 'emenda_recebida',
     'A emenda à inicial foi recebida e aceita pelo juízo.',
     'Com a petição inicial corrigida e aceita, o processo pôde seguir para a citação da parte requerida.',
     null),
    ('2026-06-16'::date, 'habilitacao_parte_contraria',
     'A advogada de Maria Francina se habilitou nos autos, tomando conhecimento formal do processo.',
     'A parte requerida já está representada e ciente da ação.',
     'Aguardar a apresentação de defesa (contestação) pela parte requerida.'),
    ('2026-07-31'::date, 'contestacao',
     'Maria Francina apresentou contestação, alegando preliminarmente que a ação teria sido movida pela via processual errada e falta de interesse processual, e no mérito defendendo que a cláusula do FUSEX seria uma contrapartida negociada na separação.',
     'A parte contrária apresentou sua defesa completa, questionando tanto a forma quanto o mérito do pedido.',
     null),
    ('2026-07-31'::date, 'audiencia_realizada',
     'Realizada audiência de mediação (por videoconferência); as partes não chegaram a um acordo.',
     'Antes de prosseguir com a disputa judicial, a Justiça sempre tenta uma solução consensual - nesse caso, não foi possível chegar a um consenso, e o processo segue seu rito normal.',
     'Apresentar réplica à contestação, rebatendo os argumentos da parte contrária, especialmente quanto às preliminares e à validade da cláusula à luz do Estatuto dos Militares. Depois, aguardar decisão do juízo sobre as preliminares e, se superadas, sobre o mérito - a expectativa é de julgamento antecipado, já que a controvérsia central é uma questão de direito.')
) as v(data, tipo, descricao_publica, explicacao, proximos_passos) on true
where p.numero = '0747388-27.2026.8.07.0016';
