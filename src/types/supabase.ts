export type TipoUsuario = "cliente" | "admin";

export type Usuario = {
  id: string;
  email: string;
  senha_hash: string;
  tipo: TipoUsuario;
  nome: string | null;
  created_at: string;
};

export type Processo = {
  id: string;
  numero: string;
  tipo: string | null;
  cliente_id: string;
  descricao: string | null;
  status_atual: string | null;
  created_at: string;
};

export type Andamento = {
  id: string;
  processo_id: string;
  data: string;
  tipo: string | null;
  descricao_publica: string;
  explicacao: string | null;
  created_at: string;
};

export type Documento = {
  id: string;
  processo_id: string;
  nome_arquivo: string;
  caminho_storage: string;
  created_at: string;
};

export type Noticia = {
  id: string;
  titulo: string;
  slug: string;
  conteudo: string;
  autor: string | null;
  data: string;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: Usuario;
        Insert: Partial<Usuario> & Pick<Usuario, "email" | "senha_hash" | "tipo">;
        Update: Partial<Usuario>;
        Relationships: [];
      };
      processos: {
        Row: Processo;
        Insert: Partial<Processo> & Pick<Processo, "numero" | "cliente_id">;
        Update: Partial<Processo>;
        Relationships: [
          {
            foreignKeyName: "processos_cliente_id_fkey";
            columns: ["cliente_id"];
            isOneToOne: false;
            referencedRelation: "usuarios";
            referencedColumns: ["id"];
          },
        ];
      };
      andamentos: {
        Row: Andamento;
        Insert: Partial<Andamento> & Pick<Andamento, "processo_id" | "descricao_publica">;
        Update: Partial<Andamento>;
        Relationships: [
          {
            foreignKeyName: "andamentos_processo_id_fkey";
            columns: ["processo_id"];
            isOneToOne: false;
            referencedRelation: "processos";
            referencedColumns: ["id"];
          },
        ];
      };
      documentos: {
        Row: Documento;
        Insert: Partial<Documento> &
          Pick<Documento, "processo_id" | "nome_arquivo" | "caminho_storage">;
        Update: Partial<Documento>;
        Relationships: [
          {
            foreignKeyName: "documentos_processo_id_fkey";
            columns: ["processo_id"];
            isOneToOne: false;
            referencedRelation: "processos";
            referencedColumns: ["id"];
          },
        ];
      };
      noticias: {
        Row: Noticia;
        Insert: Partial<Noticia> & Pick<Noticia, "titulo" | "slug" | "conteudo">;
        Update: Partial<Noticia>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
