-- Processo real: Acao de Imissao na Posse de 2004 (Correntina/BA), extinta
-- por abandono em 2023 sem intimacao pessoal - hoje contestada via Querela
-- Nullitatis (ver 0012_processo_querela_nullitatis_tjba.sql).

insert into processos (numero, tipo, cliente_id, descricao, status_atual)
values (
  '0000338-10.2004.8.05.0069',
  'Imissão na Posse',
  (select id from usuarios where email = 'pdroivojr@gmail.com'),
  'Ação de Imissão na Posse ajuizada por Pedro Ivo Moézia de Lima, Sérgio Leverdi Campos e Silva e Sementes Pato Branco (polo autor) contra os ocupantes das terras, buscando a posse de aproximadamente 2.900 hectares de terras produtivas (soja e milho) na fronteira entre Goiás e Bahia, das quais os autores foram impedidos de tomar posse por resistência armada dos ocupantes em 2004. Após decisão favorável definitiva em 2005, a execução da imissão foi suspensa em 2006 por decisão do STF (ACO 347/BA) sobre litígios fundiários na região, e o processo permaneceu praticamente paralisado por quase 20 anos, sendo extinto por abandono em 2023 sem que os autores fossem intimados pessoalmente.',
  'Processo arquivado (extinto sem resolução de mérito) - validade da extinção está sendo discutida em ação própria (Querela Nullitatis, TJBA nº 8049944-09.2026.8.05.0000)'
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
    ('2004-12-09'::date, 'distribuido',
     'Ação de Imissão na Posse distribuída na Comarca de São Domingos de Goiás/GO, contra Sementes Pato Branco Ltda, depois que os autores foram impedidos por homens armados de tomar posse das terras que haviam acabado de adquirir.',
     'O processo buscava garantir judicialmente a posse de terras compradas pelos autores, mas que eles não conseguiam ocupar por resistência armada dos ocupantes.',
     null::text),
    ('2005-01-15'::date, 'liminar_deferida',
     'A juíza plantonista de Jaciara/GO deferiu liminarmente o pedido de imissão na posse, expedindo os mandados de imissão e de citação - que o oficial de justiça não conseguiu cumprir por nova resistência armada dos ocupantes.',
     'A Justiça reconheceu, em caráter provisório e urgente, o direito dos autores à posse das terras, mas a ordem não pôde ser efetivada na prática por resistência armada.',
     null),
    ('2005-09-20'::date, 'agravo_negado',
     'O Tribunal de Justiça de Goiás negou provimento, por unanimidade, ao recurso (agravo de instrumento) dos réus, mantendo a decisão favorável aos autores.',
     'A tentativa dos ocupantes de reverter a decisão na segunda instância não teve sucesso.',
     null),
    ('2005-11-03'::date, 'transitado_em_julgado',
     'A decisão do TJGO transitou em julgado, tornando definitiva a ordem de imissão na posse em favor dos autores.',
     'A decisão se tornou definitiva e não cabia mais recurso - o mandado de imissão na posse poderia, em tese, ser cumprido a partir de então.',
     'Cumprimento do mandado de imissão na posse, com reforço policial solicitado em razão da resistência armada já demonstrada pelos ocupantes.'),
    ('2006-03-15'::date, 'execucao_suspensa',
     'O TJGO determinou a suspensão da execução da decisão, em cumprimento a uma ordem do STF (ACO 347/BA) que suspendia decisões sobre litígios de terras numa região da fronteira entre Goiás e Bahia.',
     'Mesmo com a decisão já definitiva a favor dos autores, o cumprimento dela foi suspenso por causa de uma ordem mais ampla do STF envolvendo diversos processos de disputas de terra na região - não se tratou de reversão do mérito, apenas de uma pausa determinada por uma corte superior.',
     null),
    ('2016-06-01'::date, 'redistribuido',
     'Processo redistribuído para a 1ª Vara dos Feitos Relativos às Relações de Consumo, Cíveis e Comerciais de Correntina/BA (data aproximada). Entre 2006 e 2016 o processo permaneceu praticamente parado em razão da suspensão determinada pelo STF.',
     'A ação passou a tramitar em uma nova vara, na Bahia, ainda sob os efeitos da suspensão determinada anos antes.',
     null),
    ('2022-12-05'::date, 'despacho_saneamento',
     'Despacho de organização do acervo da vara, pedindo que as partes se manifestassem em 15 dias sobre a situação atual do processo, sob pena de ele ser considerado "sem manifestação".',
     'A vara estava reorganizando um grande volume de processos parados e pediu que todas as partes atualizassem a situação de cada um - um trâmite administrativo, não uma decisão sobre o caso em si.',
     'Responder ao despacho dentro do prazo de 15 dias.'),
    ('2023-04-27'::date, 'sentenca',
     'O processo foi extinto sem resolução do mérito (sem decisão sobre quem tinha razão), sob a justificativa de abandono da causa pelos autores, que não haviam respondido ao despacho de dezembro de 2022.',
     'Como os autores não responderam a tempo ao pedido de atualização, o juiz entendeu que o processo estava abandonado e o encerrou. Esse é o ponto central hoje contestado: por lei, essa extinção exigiria uma intimação pessoal prévia dos autores, o que não ocorreu.',
     null),
    ('2023-06-06'::date, 'transitado_em_julgado',
     'Certidão de que ninguém se manifestou contra a extinção dentro do prazo legal, tornando a sentença definitiva.',
     'Sem recurso a tempo, a extinção do processo se tornou, a princípio, definitiva.',
     null),
    ('2025-02-27'::date, 'pedido_reconsideracao',
     'Pedido de reconsideração protocolado, explicando as razões da falta de manifestação anterior (décadas de tramitação atravessando a suspensão do STF) e solicitando a reabertura do processo.',
     'Foi uma tentativa simples e direta de pedir ao próprio juiz que revertesse a extinção, explicando o contexto excepcional do caso.',
     'Aguardar a decisão do juízo sobre o pedido de reconsideração.'),
    ('2026-02-26'::date, 'indeferimento',
     'O juízo indeferiu o pedido de reconsideração, por entender que esse não era o instrumento processual adequado para desfazer uma decisão já transitada em julgado.',
     'O juiz reconheceu que pode ter havido um problema, mas apontou que a forma de corrigir isso precisa ser outra ação específica, não um simples pedido dentro do próprio processo já encerrado.',
     null),
    ('2026-03-09'::date, 'peticao_fundamentacao',
     'Nova petição apresentada, com fundamentação jurídica mais detalhada (violação à coisa julgada, ausência de intimação pessoal), insistindo na nulidade da extinção.',
     'Reforçamos com mais base jurídica os mesmos argumentos, mas o processo já encerrado tinha alcance limitado para essa discussão.',
     'A discussão sobre a validade da extinção deste processo agora segue em ação própria, mais adequada para esse fim: a Querela Nullitatis Insanabilis (TJBA nº 8049944-09.2026.8.05.0000), atualmente aguardando julgamento de um recurso sobre qual tribunal deve julgá-la.')
) as v(data, tipo, descricao_publica, explicacao, proximos_passos) on true
where p.numero = '0000338-10.2004.8.05.0069';
