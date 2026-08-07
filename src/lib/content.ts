export type Advogado = {
  slug: string;
  nome: string;
  titulo: string;
  especialidades: string[];
  bio: string;
};

export const advogados: Advogado[] = [
  {
    slug: "pedro-ivo-moezia-de-lima-junior",
    nome: "Pedro Ivo Moézia de Lima Junior",
    titulo: "Sócio",
    especialidades: ["Direito Digital", "LGPD", "Soluções Tecnológicas"],
    bio: "Atua na interseção entre direito e tecnologia, com foco em proteção de dados pessoais (LGPD), segurança da informação, contratos digitais e soluções jurídicas orientadas por tecnologia.",
  },
  {
    slug: "pedro-ivo-moezia-de-lima",
    nome: "Pedro Ivo Moézia de Lima",
    titulo: "Sócio",
    especialidades: ["Direito Civil", "Direito Militar"],
    bio: "Advogado com atuação consolidada em Direito Civil e Direito Militar, oferecendo assessoria e representação em contratos, responsabilidade civil e questões da carreira militar.",
  },
];

export type AreaAtuacao = {
  slug: string;
  nome: string;
  descricao: string;
  topicos: string[];
};

export const areasDeAtuacao: AreaAtuacao[] = [
  {
    slug: "direito-digital",
    nome: "Direito Digital",
    descricao:
      "Assessoria jurídica para questões que envolvem tecnologia, internet e ambientes digitais.",
    topicos: [
      "Contratos digitais e de tecnologia",
      "Fraudes eletrônicas e phishing",
      "Responsabilidade civil por incidentes digitais",
      "Segurança da informação",
      "Governança jurídica de inteligência artificial",
      "Resposta jurídica a incidentes digitais",
    ],
  },
  {
    slug: "lgpd",
    nome: "LGPD e Proteção de Dados",
    descricao:
      "Adequação, consultoria e defesa em questões relacionadas à Lei Geral de Proteção de Dados.",
    topicos: [
      "Adequação à LGPD",
      "Elaboração de políticas de privacidade",
      "Atendimento a incidentes de dados",
      "Representação perante a ANPD",
      "Apoio jurídico ao encarregado pelo tratamento de dados",
      "Orientação sobre direitos dos titulares de dados",
    ],
  },
  {
    slug: "direito-civil",
    nome: "Direito Civil",
    descricao: "Atuação em demandas cíveis, contratuais e de responsabilidade civil.",
    topicos: [
      "Contratos",
      "Responsabilidade civil",
      "Direito do consumidor",
      "Ações indenizatórias",
    ],
  },
  {
    slug: "direito-militar",
    nome: "Direito Militar",
    descricao: "Assessoria a militares e assuntos relacionados à carreira militar.",
    topicos: [
      "Direitos e deveres militares",
      "Processos administrativos disciplinares",
      "Reforma e reserva",
      "Pensões e benefícios",
    ],
  },
];

export type SolucaoJuridica = {
  slug: string;
  titulo: string;
  descricaoCurta: string;
  itens: string[];
  observacao?: string;
  portalCta?: boolean;
};

/** As três soluções jurídicas em destaque na página /solucoes-juridicas. */
export const solucoesJuridicas: SolucaoJuridica[] = [
  {
    slug: "inteligencia-juridica-empresarial",
    titulo: "Inteligência Jurídica Empresarial",
    descricaoCurta:
      "Análise jurídica de processos, contratos e riscos apoiada por organização de dados e indicadores.",
    itens: [
      "Diagnóstico jurídico de carteiras processuais",
      "Identificação de causas recorrentes de litígios",
      "Análise de assuntos, fases e valores envolvidos",
      "Organização de informações jurídicas em relatórios executivos",
      "Identificação de riscos contratuais e processuais",
      "Apoio à definição de medidas preventivas",
      "Acompanhamento periódico de indicadores jurídicos",
    ],
    observacao:
      "Os indicadores auxiliam a análise jurídica e a tomada de decisão, sem constituir garantia ou previsão de resultado.",
  },
  {
    slug: "governanca-dados-ia",
    titulo: "Governança de Dados e Inteligência Artificial",
    descricaoCurta:
      "Assessoria jurídica para organizações que tratam dados pessoais ou utilizam ferramentas de inteligência artificial.",
    itens: [
      "Análise jurídica de operações de tratamento de dados",
      "Adequação à LGPD",
      "Revisão de políticas, contratos e avisos de privacidade",
      "Avaliação jurídica de fornecedores de tecnologia e IA",
      "Elaboração de políticas internas para uso de inteligência artificial",
      "Definição de critérios de revisão humana",
      "Orientação sobre confidencialidade, privacidade e propriedade intelectual",
      "Apoio jurídico na resposta a incidentes envolvendo dados",
      "Assessoria jurídica ao encarregado pelo tratamento de dados",
    ],
  },
  {
    slug: "contencioso-acompanhamento-digital",
    titulo: "Contencioso com Acompanhamento Digital",
    descricaoCurta:
      "Atuação processual acompanhada por informações organizadas, comunicação clara e acesso digital às atualizações do caso.",
    itens: [
      "Acompanhamento jurídico do processo",
      "Atualizações em linguagem clara",
      "Linha do tempo das principais movimentações",
      "Organização de documentos e pendências",
      "Indicação dos próximos passos",
      "Relatórios periódicos",
      "Acesso ao Portal do Cliente",
      "Visão consolidada para clientes com mais de um processo",
    ],
    portalCta: true,
  },
];

export type SolucaoComplementar = {
  titulo: string;
  texto: string;
};

export const solucoesComplementares: SolucaoComplementar[] = [
  {
    titulo: "Auditoria e Inteligência Contratual",
    texto:
      "Análise jurídica de contratos com organização de informações sobre vigência, renovação, reajustes, obrigações, garantias, multas, proteção de dados e outros pontos relevantes. Recursos tecnológicos podem auxiliar na extração e comparação de informações, sempre com revisão jurídica.",
  },
  {
    titulo: "Diagnóstico de Litigiosidade",
    texto:
      "Análise de demandas recorrentes para identificar procedimentos, contratos ou situações que possam estar contribuindo para o surgimento de conflitos. A partir dos dados disponíveis, o escritório apresenta avaliação jurídica e possíveis medidas preventivas.",
  },
  {
    titulo: "Monitoramento Jurídico Personalizado",
    texto:
      "Acompanhamento de alterações normativas, decisões e temas jurídicos relevantes para a atividade do cliente, acompanhado de explicações sobre possíveis impactos e providências que mereçam avaliação.",
  },
  {
    titulo: "Due Diligence Orientada por Dados",
    texto:
      "Organização e análise jurídica de documentos, processos, contratos e contingências em operações empresariais, parcerias, investimentos e avaliação de fornecedores.",
  },
  {
    titulo: "Resposta Jurídica a Incidentes Digitais",
    texto:
      "Assessoria jurídica em situações envolvendo vazamento de dados, fraude, acesso indevido e outros incidentes digitais, incluindo avaliação de obrigações, preservação jurídica de evidências, análise de comunicações necessárias e revisão de responsabilidades contratuais. Atividades técnicas especializadas podem exigir a participação de profissionais ou empresas de tecnologia, sob coordenação jurídica e com definição adequada de responsabilidades.",
  },
];

export type EtapaMetodologia = {
  numero: string;
  titulo: string;
  texto: string;
};

export const etapasMetodologia: EtapaMetodologia[] = [
  {
    numero: "1",
    titulo: "Compreensão do contexto",
    texto:
      "Levantamento dos objetivos, documentos, processos e questões jurídicas relevantes para o cliente.",
  },
  {
    numero: "2",
    titulo: "Organização das informações",
    texto:
      "Estruturação dos dados e documentos necessários para permitir uma visão clara do cenário analisado.",
  },
  {
    numero: "3",
    titulo: "Análise jurídica",
    texto:
      "Interpretação profissional das informações, identificação de riscos e elaboração das recomendações aplicáveis.",
  },
  {
    numero: "4",
    titulo: "Acompanhamento",
    texto:
      "Apresentação dos resultados, definição de providências e, quando contratado, acompanhamento periódico por relatórios ou ambiente digital.",
  },
];

export const principiosUsoIA: string[] = [
  "Supervisão profissional",
  "Proteção das informações do cliente",
  "Revisão das respostas produzidas",
  "Prevenção de conclusões sem fundamento",
  "Transparência quando o uso da tecnologia for relevante",
  "Responsabilidade jurídica sempre atribuída ao profissional",
];
