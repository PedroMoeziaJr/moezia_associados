import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-moezia-dark text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm text-white/60">
            Advocacia e Assessoria Jurídica
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/advogados" className="hover:text-white">Advogados</Link></li>
            <li><Link href="/areas-de-atuacao" className="hover:text-white">Áreas de Atuação</Link></li>
            <li><Link href="/#noticias" className="hover:text-white">Notícias</Link></li>
            <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
            Acesso
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/portal/login" className="hover:text-white">Portal do Cliente</Link></li>
            <li><Link href="/admin/login" className="hover:text-white">Área Administrativa</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">
            Contato
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>contato@moeziaassociados.adv.br</li>
            <li>Brasília, DF</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Moézia Associados. Todos os direitos reservados.
      </div>
    </footer>
  );
}
