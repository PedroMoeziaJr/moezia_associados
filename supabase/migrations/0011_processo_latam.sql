-- Processo real: acao de danos morais contra a TAM/LATAM (Juizado Especial
-- Civel de Brasilia), encerrada por ausencia dos autores a audiencia.

insert into processos (numero, tipo, cliente_id, descricao, status_atual)
values (
  '0806452-02.2025.8.07.0016',
  'Ação de Indenização por Danos Morais (Juizado Especial Cível)',
  (select id from usuarios where email = 'pdroivojr@gmail.com'),
  'Ação de indenização por danos morais movida por Pedro Ivo Moézia de Lima Junior e Ariane Silva de Oliveira contra a TAM Linhas Aéreas S/A (LATAM), relacionada a um cancelamento de voo internacional.',
  'Processo encerrado - extinto sem resolução de mérito por ausência à audiência; arquivado definitivamente, com custas processuais pendentes'
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
    ('2025-10-27'::date, 'distribuido',
     'Ação de indenização por danos morais contra a TAM/LATAM distribuída no 2º Juizado Especial Cível de Brasília.',
     'O processo foi oficialmente registrado, buscando reparação por danos morais relacionados a um cancelamento de voo internacional.',
     null::text),
    ('2025-11-03'::date, 'citacao',
     'Citação expedida, com a intimação para a audiência de conciliação.',
     'A empresa aérea foi formalmente notificada do processo e da data da audiência.',
     null),
    ('2025-12-05'::date, 'contestacao',
     'A TAM apresentou contestação ao pedido.',
     'A empresa aérea apresentou sua defesa por escrito.',
     null),
    ('2025-12-09'::date, 'audiencia_realizada',
     'Realizada a audiência de conciliação por videoconferência; os autores não compareceram, apenas a ré esteve presente.',
     'A ausência das partes autoras à audiência é um evento processual sério nos Juizados Especiais, que costuma levar à extinção do processo.',
     null),
    ('2025-12-10'::date, 'sentenca',
     'Sentença extinguindo o processo, sem resolução de mérito, por ausência dos autores à audiência.',
     'Como os autores não compareceram à audiência de conciliação, a lei dos Juizados Especiais determina o encerramento do processo sem que o caso chegue a ser julgado no mérito - ou seja, não houve decisão sobre se a empresa aérea tinha ou não razão.',
     null),
    ('2026-02-03'::date, 'transitado_em_julgado',
     'A sentença de extinção se tornou definitiva (trânsito em julgado certificado em 13/02/2026).',
     'Não havendo recurso dentro do prazo, a decisão que encerrou o processo se tornou definitiva e não pode mais ser questionada nestes autos.',
     null),
    ('2026-03-15'::date, 'arquivado',
     'Certidão de arquivamento definitivo dos autos, restando pendente apenas o pagamento de custas processuais.',
     'O processo está formalmente encerrado e arquivado pelo tribunal.',
     'O processo está encerrado. Resta apenas regularizar o pagamento das custas processuais pendentes. Se ainda houver interesse na reparação pelo cancelamento do voo, seria necessário avaliar o ajuizamento de uma nova ação, respeitado o prazo de prescrição aplicável.')
) as v(data, tipo, descricao_publica, explicacao, proximos_passos) on true
where p.numero = '0806452-02.2025.8.07.0016';
