-- Processo real: acao de ressarcimento de despesas medicas (FUSEX) contra a
-- Uniao Federal, vitoriosa em 2a instancia no TRF-1.

insert into processos (numero, tipo, cliente_id, descricao, status_atual)
values (
  '1095509-18.2024.4.01.3400',
  'Ação de Ressarcimento de Despesas Médicas (FUSEX) - Apelação Cível',
  (select id from usuarios where email = 'pdroivojr@gmail.com'),
  'Ação movida por Pedro Ivo Moézia de Lima contra a União Federal, pedindo o ressarcimento de R$ 246.809,80 em despesas médico-hospitalares (Hospital Alvorada e Hospital Sírio-Libanês) com duas cirurgias de urgência - tratamento de um aneurisma da aorta abdominal e de nódulos com suspeita de câncer urológico - realizadas fora da rede credenciada do FUSEX (Fundo de Saúde do Exército) por necessidade de atendimento imediato.',
  'Vitória confirmada em 2ª instância (TRF-1) - aguardando o fim do prazo de 30 dias para a União apresentar eventual recurso especial/extraordinário'
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
    ('2024-11-25'::date, 'distribuido',
     'Ação ajuizada na Justiça Federal (21ª Vara Federal Cível do DF), pedindo o ressarcimento das despesas médicas, com justiça gratuita concedida.',
     'O processo foi oficialmente registrado, buscando reaver os valores pagos particularmente em razão da urgência médica.',
     null::text),
    ('2025-02-25'::date, 'citacao',
     'A União Federal foi citada para apresentar defesa.',
     null,
     null),
    ('2025-03-24'::date, 'contestacao',
     'A União apresentou contestação ao pedido.',
     null,
     null),
    ('2025-04-22'::date, 'sentenca',
     'Sentença julgou o pedido IMPROCEDENTE, sob o fundamento de que não teria sido comprovada a comunicação prévia da urgência ao FUSEX, nem seguido o procedimento administrativo interno (IR 30-38).',
     'O juiz de primeiro grau entendeu que faltou provar que o FUSEX foi avisado a tempo sobre a urgência e que o trâmite administrativo interno não foi seguido corretamente - por isso negou o pedido nesta fase.',
     'Recorrer da sentença por meio de apelação ao Tribunal Regional Federal da 1ª Região.'),
    ('2025-05-26'::date, 'apelacao',
     'Apelação interposta ao TRF-1, com laudos médicos adicionais e precedentes de casos semelhantes já julgados favoravelmente pelo mesmo Tribunal.',
     null,
     null),
    ('2026-03-09'::date, 'acordao_apelacao',
     'A 5ª Turma do TRF-1, por unanimidade, deu provimento à apelação, reformando a sentença: reconheceu o direito ao ressarcimento integral das despesas médicas, por comprovada situação de urgência/emergência, e inverteu o ônus da sucumbência (a União passa a arcar com custas e honorários).',
     'Isso é uma vitória: os desembargadores entenderam que a gravidade do quadro de saúde (risco iminente à vida) e a boa-fé demonstrada justificam o ressarcimento, mesmo sem o cumprimento estrito de toda a burocracia interna do FUSEX - e ainda condenaram a União a pagar as custas do processo.',
     null),
    ('2026-03-26'::date, 'embargos_declaracao',
     'A União apresentou embargos de declaração contra essa decisão, tentando reverter o resultado.',
     null,
     'Aguardar o julgamento dos embargos de declaração pela 5ª Turma.'),
    ('2026-07-31'::date, 'embargos_rejeitados',
     'A 5ª Turma, por unanimidade, rejeitou os embargos de declaração da União, mantendo integralmente a vitória.',
     'A União tentou usar esse recurso para tentar mudar o resultado, mas o Tribunal entendeu que não havia nenhuma omissão, contradição ou erro na decisão anterior - a vitória permanece de pé.',
     null),
    ('2026-08-03'::date, 'intimacao_final',
     'As partes foram intimadas do acórdão; a União tem prazo de 30 dias para, se quiser, apresentar recurso a tribunal superior (STJ/STF).',
     null,
     'Aguardar o transcurso do prazo de 30 dias da União. Se não houver novo recurso, a decisão se torna definitiva e os valores devidos poderão ser cobrados (fase de cumprimento de sentença).')
) as v(data, tipo, descricao_publica, explicacao, proximos_passos) on true
where p.numero = '1095509-18.2024.4.01.3400';
