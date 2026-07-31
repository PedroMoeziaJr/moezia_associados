# Guia do Painel Administrativo

Guia rápido para o dia a dia de quem administra o site (`/admin`).

## Login

Acesse `/admin/login` com seu e-mail e senha de administrador. Esse login é
separado do login do Portal do Cliente (`/portal/login`) mesmo que ambos usem
a mesma tabela `usuarios` no banco — o que muda é o campo `tipo` do usuário.

## Cadastrar um cliente novo

1. Vá em **Clientes** no menu do admin.
2. Preencha nome, e-mail e uma senha provisória (mínimo 8 caracteres).
3. Avise o cliente a senha por um canal seguro e peça para ele não compartilhar.
   (Não existe ainda um fluxo de "esqueci minha senha" — trocas de senha são
   feitas diretamente no banco por enquanto.)

## Cadastrar um processo novo

1. Vá em **Processos** > **Novo Processo**.
2. Preencha o número do processo (formato CNJ), tipo (ex: "Ação Civil"),
   selecione o cliente vinculado, uma descrição curta e o status inicial.

## Registrar um andamento

1. Abra o processo em **Processos**.
2. No formulário **Registrar novo andamento**, preencha:
   - **Tipo de andamento**: categoria usada para gerar a explicação padrão em
     linguagem simples no portal do cliente (ex: "Citação", "Sentença").
   - **Data**: data do andamento.
   - **Descrição (visível ao cliente)**: texto direto do que aconteceu.
   - **Explicação em linguagem simples**: opcional. Se preenchida, substitui a
     explicação padrão do "tipo" escolhido — use quando o caso tiver uma
     nuance que o texto padrão não cobre.
   - **Atualizar status atual do processo**: opcional. Se preenchido, atualiza
     o status em destaque que o cliente vê no topo da página do processo.
3. Clique em **Registrar andamento**. Isso:
   - Salva o andamento na tabela `andamentos` do Supabase.
   - Atualiza `status_atual` do processo, se você preencheu esse campo.
   - Tenta um commit git automático (`update: andamento processo [numero] -
     [status] - [data]`) — só funciona rodando localmente, veja o README.

Os tipos de andamento têm explicações padrão pré-definidas em
[`src/lib/status-explanations.ts`](src/lib/status-explanations.ts). Se quiser
adicionar um novo tipo com explicação padrão, edite esse arquivo.

## Notícias

- **Criar**: `/admin/noticias/novo`. O slug da URL é gerado automaticamente a
  partir do título.
- **Editar**: clique em "Editar" na lista de notícias.
- **Excluir**: clique em "Excluir" na lista (pede confirmação).

Publicar ou editar uma notícia também tenta um commit automático (`docs:
adicionar nova notícia "..."`), com a mesma limitação de só funcionar rodando
localmente.

## Documentos do processo

O upload de documentos para o portal do cliente ainda não tem uma tela no
admin — os arquivos precisam ser enviados manualmente ao bucket
`documentos-processos` no Supabase Storage, e uma linha correspondente
adicionada na tabela `documentos` (`processo_id`, `nome_arquivo`,
`caminho_storage`). Isso é um próximo passo natural de evolução do painel.
