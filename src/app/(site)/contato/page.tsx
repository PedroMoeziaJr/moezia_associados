import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | Moézia Associados",
};

export default function ContatoPage() {
  return (
    <div className="container-page py-16">
      <h1 className="font-serif text-4xl">Contato</h1>
      <p className="mt-3 max-w-2xl text-moezia-dark/70">
        Entre em contato com o Moézia Associados. Responderemos o quanto antes.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <form className="space-y-4 rounded-lg border border-black/5 bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="mensagem">
              Mensagem
            </label>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={5}
              required
              className="mt-1 w-full rounded-md border border-black/10 px-3 py-2 text-sm focus:border-moezia-red focus:outline-none"
            />
          </div>
          <p className="text-xs text-moezia-dark/50">
            Este formulário ainda não está conectado a um serviço de e-mail.
            Configure um provedor (ex: Resend, SendGrid) na rota de API antes
            de publicar em produção.
          </p>
          <button
            type="submit"
            className="rounded-full bg-moezia-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-moezia-red-dark transition-colors"
          >
            Enviar mensagem
          </button>
        </form>

        <div className="space-y-4">
          <div>
            <h2 className="font-serif text-lg">E-mail</h2>
            <p className="text-moezia-dark/70">contato@moeziaassociados.adv.br</p>
          </div>
          <div>
            <h2 className="font-serif text-lg">Localização</h2>
            <p className="text-moezia-dark/70">Brasília, DF</p>
          </div>
        </div>
      </div>
    </div>
  );
}
