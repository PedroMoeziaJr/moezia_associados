import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "/advogados", label: "Advogados" },
  { href: "/areas-de-atuacao", label: "Áreas de Atuação" },
  { href: "/solucoes-juridicas", label: "Soluções Jurídicas" },
  { href: "/#noticias", label: "Notícias" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="relative border-b border-black/5 bg-white/90 backdrop-blur sticky top-0 z-40">
      <div className="container-page flex items-center justify-between gap-4 py-2.5 lg:py-3">
        <span className="lg:hidden">
          <Logo height={60} />
        </span>
        <span className="hidden lg:inline-flex">
          <Logo height={84} />
        </span>

        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium whitespace-nowrap">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-moezia-dark/80 hover:text-moezia-red transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/portal/login"
          className="hidden lg:inline-flex items-center rounded-full bg-moezia-red px-6 py-3 text-sm font-semibold text-white hover:bg-moezia-red-dark transition-colors"
        >
          Portal do Cliente
        </Link>

        <MobileMenu links={NAV_LINKS} />
      </div>
    </header>
  );
}
