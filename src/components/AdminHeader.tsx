import Link from "next/link";
import LogoHorizontal from "./LogoHorizontal";
import LogoutButton from "./LogoutButton";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/processos", label: "Processos" },
  { href: "/admin/noticias", label: "Notícias" },
  { href: "/admin/clientes", label: "Clientes" },
];

export default function AdminHeader({ nome }: { nome: string | null | undefined }) {
  return (
    <header className="border-b border-white/10 bg-moezia-dark text-white">
      <div className="container-page flex items-center justify-between py-3">
        <div className="flex items-center gap-8">
          <LogoHorizontal href="/admin" variant="light" showTagline={false} />
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-white/80 hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-white/60">{nome}</span>
          <LogoutButton loginPath="/admin/login" variant="dark" />
        </div>
      </div>
    </header>
  );
}
