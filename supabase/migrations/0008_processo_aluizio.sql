-- Processo real: Aluizio Jose do Nascimento vs BSB Park e socios (Justica do
-- Trabalho, ja em fase de execucao residual apos acordo homologado).

insert into processos (numero, tipo, cliente_id, descricao, status_atual)
values (
  '0017000-48.2004.5.06.0012',
  'Ação Trabalhista Ordinária (fase de execução)',
  (select id from usuarios where email = 'pdroivojr@gmail.com'),
  'Reclamação trabalhista movida por Aluízio José do Nascimento contra BSB Park - Administradora de Estacionamentos e os sócios (Pedro Ivo Moézia de Lima, Francisco de Assis da Silva e Oswaldina Lima Dambisky). O mérito já foi resolvido por acordo homologado em 2023, integralmente pago ao reclamante e ao advogado dele. Resta pendente apenas a execução de custas processuais e contribuição previdenciária (INSS) devidas à Justiça.',
  'Execução residual de custas e INSS suspensa por prescrição intercorrente'
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
    ('2004-02-06'::date, 'distribuido',
     'Reclamação trabalhista autuada na 12ª Vara do Trabalho do Recife/PE.',
     'O processo foi registrado formalmente na Justiça do Trabalho.',
     null::text),
    ('2022-01-14'::date, 'sobrestamento',
     'A execução foi suspensa por 1 ano por falta de bens penhoráveis localizados do lado dos réus.',
     'Quando não se localizam bens para garantir o pagamento, a Justiça suspende o processo por um tempo antes de arquivar ou insistir na cobrança.',
     null),
    ('2023-08-02'::date, 'acordo_encaminhado',
     'As partes foram intimadas a regularizar procurações para formalizar um acordo.',
     'Isso indica que reclamante e réus haviam chegado a um entendimento e se preparavam para firmar o acordo perante o juízo.',
     null),
    ('2023-08-27'::date, 'sentenca',
     'Sentença homologando o acordo judicial: pagamento total de R$ 41.966,69 ao reclamante (parte via liberação de bloqueios, parte já paga diretamente) mais R$ 10.000,00 de honorários ao advogado dele. Processo extinto com resolução de mérito.',
     'O acordo encerrou definitivamente a disputa principal - os valores devidos a Aluízio e ao advogado dele foram totalmente quitados.',
     null),
    ('2023-11-06'::date, 'execucao_residual',
     'Iniciada a execução dos valores que ainda faltavam: custas processuais (R$ 839,34) e contribuição previdenciária/INSS (R$ 3.777,00), devidos à Justiça (não ao reclamante, que já recebeu tudo).',
     'Mesmo com o acordo pago, ficam pendentes taxas e o INSS sobre os valores pagos - essa cobrança é feita separadamente, e é isso que ainda tramita hoje.',
     null),
    ('2024-08-14'::date, 'execucao_frustrada',
     'As tentativas de bloqueio de valores para pagar essas custas e o INSS não tiveram êxito.',
     'O juízo tentou localizar dinheiro em contas para quitar automaticamente o débito residual, sem sucesso até o momento.',
     'Aguardar nova indicação de meios de cobrança ou a suspensão/prescrição do débito.'),
    ('2025-01-13'::date, 'prescricao_intercorrente',
     'Decisão suspendendo a execução residual (custas e INSS) por até 2 anos, por inércia na indicação de novos meios de cobrança, com prazo de prescrição intercorrente correndo nesse período.',
     'Se ninguém der andamento a essa cobrança de custas/INSS durante esse prazo de 2 anos, ela pode ser extinta por prescrição - ou seja, essa pendência residual tende a se resolver sozinha com o tempo, sem necessidade de mais pagamentos relacionados ao caso principal (que já está encerrado).',
     'Aguardar o transcurso do prazo de suspensão (até janeiro de 2027). Não há necessidade de ação da empresa nesse meio tempo, já que a cobrança pendente é de custas/INSS e não há mais valores devidos ao reclamante.')
) as v(data, tipo, descricao_publica, explicacao, proximos_passos) on true
where p.numero = '0017000-48.2004.5.06.0012';
