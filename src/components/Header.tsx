import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/advogados", label: "Advogados" },
  { href: "/areas-de-atuacao", label: "Áreas de Atuação" },
  { href: "/blog", label: "Notícias" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="border-b border-black/5 bg-white/90 backdrop-blur sticky top-0 z-40">
      <div className="container-page flex items-center justify-between py-3">
        <Logo showTagline={false} />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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
          className="rounded-full bg-moezia-red px-5 py-2 text-sm font-semibold text-white hover:bg-moezia-red-dark transition-colors"
        >
          Portal do Cliente
        </Link>
      </div>
    </header>
  );
}
