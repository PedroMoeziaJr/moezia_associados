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
