-- Substitui os andamentos ficticios de demonstracao do processo Bradesco
-- (0705933-76.2026.8.07.0018) pela cronologia real extraida dos documentos
-- oficiais do processo (Processos/Processo_Bradesco_Claude_Cowork/).

update processos
set
  tipo = 'Ação de Restituição de Valores c/c Obrigação de Fazer',
  descricao = 'Ação contra o Banco Bradesco S.A. em razão de golpe de engenharia social sofrido em março de 2026 (fraude via WhatsApp e sites falsos do "Net Empresa"), com desvio de cerca de R$ 73 mil em transações não reconhecidas e contratação fraudulenta de um empréstimo "Capital Giro" de R$ 10.000,00 em nome da empresa.',
  status_atual = 'Banco Bradesco habilitado nos autos - aguardando citação formal e contestação'
where numero = '0705933-76.2026.8.07.0018';

delete from andamentos
where processo_id = (select id from processos where numero = '0705933-76.2026.8.07.0018');

insert into andamentos (processo_id, data, tipo, descricao_publica, explicacao, proximos_passos)
select p.id, v.data, v.tipo, v.descricao_publica, v.explicacao, v.proximos_passos
from processos p
join (
  values
    ('2026-04-29'::date, 'distribuido',
     'Ação distribuída na Justiça com o protocolo da petição inicial, do boletim de ocorrência e das provas do golpe (conversas de WhatsApp e extratos bancários).',
     'O processo foi oficialmente registrado no sistema do tribunal (PJe), iniciando a Ação de Restituição de Valores c/c Obrigação de Fazer contra o Banco Bradesco S.A.',
     null::text),
    ('2026-04-30'::date, 'incompetencia',
     'A juíza declarou incompetência da vara sorteada inicialmente e determinou a redistribuição do processo para a vara correta.',
     'Isso é um trâmite comum e não tem relação com o mérito do caso: significa apenas que o processo foi registrado, a princípio, numa vara sem competência para julgá-lo, e por isso foi encaminhado para a vara certa.',
     'Aguardar a nova distribuição e a confirmação da vara definitiva.'),
    ('2026-05-04'::date, 'redistribuicao',
     'Processo redistribuído para a Vara Cível do Riacho Fundo/DF.',
     'A vara que efetivamente vai conduzir o processo até o final foi definida.',
     null),
    ('2026-05-06'::date, 'aditamento_inicial',
     'Aditamento à petição inicial: identificamos, na revisão do extrato bancário, que os golpistas também contrataram em nome da empresa um empréstimo fraudulento ("Capital Giro" de R$ 10.000,00), já sendo descontado automaticamente da conta.',
     'Ampliamos o pedido para incluir a declaração de que esse empréstimo é inexistente/fraudulento, a devolução em dobro das parcelas já descontadas, e pedimos à juíza uma decisão urgente (tutela antecipada) para suspender os descontos imediatamente.',
     'Aguardar a análise do pedido de urgência pela juíza.'),
    ('2026-06-02'::date, 'emenda_inicial',
     'A juíza determinou a emenda (correção/complementação) da petição inicial, com prazo de 15 dias.',
     'Antes de decidir os pedidos, a juíza pediu ajustes na petição - é uma exigência processual comum, não uma rejeição do caso.',
     'Apresentar a emenda solicitada dentro do prazo.'),
    ('2026-07-21'::date, 'decisao_tutela',
     'Decisão interlocutória: a juíza recebeu a emenda, atualizou o valor da causa para R$ 92.107,16, mas INDEFERIU o pedido de suspensão urgente dos descontos do empréstimo, e determinou a citação do Banco Bradesco para apresentar defesa em 15 dias.',
     'A juíza entendeu que, pelas provas reunidas até agora, o golpe se deu por engenharia social (a funcionária foi induzida a fornecer os dados, não houve invasão do sistema do banco) - nesses casos a lei exige um exame mais aprofundado antes de suspender cobranças, o que só ocorre depois de ouvir o banco. Isso não significa que o caso foi enfraquecido: a ação continua integralmente, incluindo o pedido de suspensão do desconto, que poderá ser reavaliado mais adiante com base na defesa do banco e nas provas.',
     'O Banco Bradesco precisa ser formalmente citado e terá 15 dias, a partir da citação, para apresentar contestação (defesa).'),
    ('2026-07-25'::date, 'habilitacao_reu',
     'O Banco Bradesco constituiu advogado nos autos (Dr. Reinaldo Luis Tadeu Rondina Mandaliti) e pediu habilitação para receber todas as intimações do processo.',
     'O banco já está formalmente ciente do processo e representado por advogado - isso normalmente antecede ou acompanha a citação oficial.',
     'Aguardar a citação/intimação formal do banco e a apresentação da contestação dentro do prazo de 15 dias. Depois da defesa do banco, teremos direito a apresentar réplica.')
) as v(data, tipo, descricao_publica, explicacao, proximos_passos) on true
where p.numero = '0705933-76.2026.8.07.0018';
