/**
 * Fallback plain-language explanations by andamento "tipo", used only when
 * an andamento doesn't have its own `explicacao` filled in by the admin.
 */
export const EXPLICACOES_PADRAO: Record<string, string> = {
  distribuido:
    "O processo foi registrado oficialmente no sistema do tribunal e encaminhado para uma vara/juiz responsável.",
  citacao:
    "A parte contrária foi formalmente notificada sobre o processo e agora tem prazo para se manifestar.",
  contestacao:
    "A parte contrária apresentou sua defesa ao processo.",
  audiencia_designada:
    "Uma data foi marcada para uma audiência (reunião formal perante o juiz).",
  audiencia_realizada:
    "A audiência aconteceu conforme previsto.",
  sentenca:
    "O juiz proferiu uma decisão sobre o mérito do processo.",
  recurso:
    "Uma das partes pediu que uma instância superior reavalie a decisão.",
  transitado_em_julgado:
    "A decisão se tornou definitiva e não cabe mais recurso.",
  cumprimento_sentenca:
    "Estamos na fase de fazer a decisão ser efetivamente cumprida (ex: pagamento).",
  arquivado:
    "O processo foi encerrado e arquivado.",
};

export function explicarAndamento(tipo: string | null, explicacaoCustom: string | null) {
  if (explicacaoCustom && explicacaoCustom.trim().length > 0) {
    return explicacaoCustom;
  }
  if (tipo && EXPLICACOES_PADRAO[tipo]) {
    return EXPLICACOES_PADRAO[tipo];
  }
  return "Este andamento foi registrado no processo. Consulte seu advogado para mais detalhes sobre o que isso significa.";
}
