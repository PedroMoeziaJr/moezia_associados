-- Processo real: Acao Declaratoria de Nulidade (Querela Nullitatis
-- Insanabilis) no TJBA, contestando a extincao indevida do processo de
-- Imissao na Posse de Correntina/BA (ver 0013_processo_correntina.sql).

insert into processos (numero, tipo, cliente_id, descricao, status_atual)
values (
  '8049944-09.2026.8.05.0000',
  'Ação Declaratória de Nulidade (Querela Nullitatis Insanabilis)',
  (select id from usuarios where email = 'pdroivojr@gmail.com'),
  'Ação proposta diretamente no Tribunal de Justiça da Bahia (TJBA) por Pedro Ivo Moézia de Lima, Sérgio Leverdi Campos e Silva e Pedro Ivo Moézia de Lima Junior, buscando declarar nula a sentença de 27/04/2023 que extinguiu, sem julgamento de mérito, o processo originário de Imissão na Posse (nº 0000338-10.2004.8.05.0069, em trâmite desde 2004 na Comarca de Correntina/BA), sob o fundamento de que essa sentença foi proferida sem a intimação pessoal do autor exigida por lei - vício que o próprio juiz reconheceu na decisão. O processo originário discute a posse de aproximadamente 2.900 hectares de terras produtivas na fronteira entre Goiás e Bahia.',
  'Aguardando julgamento do agravo interno pelo colegiado da 4ª Câmara Cível sobre a competência para julgar a ação'
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
    ('2026-07-07'::date, 'distribuido',
     'Ação Declaratória de Nulidade (Querela Nullitatis Insanabilis) protocolada diretamente no Tribunal de Justiça da Bahia, pedindo a declaração de nulidade da sentença de 2023 que extinguiu o processo originário de imissão na posse.',
     'Depois que um simples pedido de reconsideração não foi suficiente para reverter a extinção do processo antigo, essa é a ação juridicamente correta para anular uma sentença viciada mesmo depois do trânsito em julgado - usada aqui porque o próprio juiz confessou não ter feito a intimação pessoal exigida por lei antes de extinguir o processo.',
     null::text),
    ('2026-07-15'::date, 'decisao_incompetencia',
     'A desembargadora relatora reconheceu que a sentença de 2023 tem vício grave (falta de intimação pessoal, confessada pelo próprio juiz), mas declarou que o Tribunal não é competente para julgar a ação diretamente, determinando o envio do processo de volta à 1ª Vara de Correntina/BA - o mesmo juízo que cometeu o erro original.',
     'A boa notícia é que a desembargadora reconheceu que houve um erro grave no processo antigo. A má notícia é que ela entendeu que quem deve julgar esse pedido de nulidade é a própria vara de origem, não o Tribunal - o que pode significar mais demora, já que essa vara não tem juiz titular fixo.',
     null),
    ('2026-07-22'::date, 'agravo_interno',
     'Agravo interno protocolado pedindo ao colegiado da 4ª Câmara Cível que reforme a decisão, mantendo o julgamento da ação no próprio Tribunal, e pedindo a suspensão do envio dos autos a Correntina até o julgamento do recurso.',
     'Como a própria ação argumenta que a vara de Correntina era incompetente desde o início, faz pouco sentido mandar de volta para lá justamente o pedido que discute essa incompetência - esse recurso pede que um colegiado de desembargadores (não apenas uma pessoa) reavalie essa decisão.',
     'Aguardar o julgamento do agravo interno pelo colegiado da 4ª Câmara Cível. Se o recurso for aceito, o próprio Tribunal julgará o pedido de nulidade; se não, o processo retorna a Correntina/BA para julgamento.')
) as v(data, tipo, descricao_publica, explicacao, proximos_passos) on true
where p.numero = '8049944-09.2026.8.05.0000';
