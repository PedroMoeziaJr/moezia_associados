import Logo from "./Logo";
import LogoutButton from "./LogoutButton";

export default function PortalHeader({
  nome,
  loginPath = "/portal/login",
}: {
  nome: string | null | undefined;
  loginPath?: string;
}) {
  return (
    <header className="border-b border-black/5 bg-white">
      <div className="container-page flex items-center justify-between py-3">
        <Logo href="/portal" height={144} />
        <div className="flex items-center gap-4 text-sm">
          <span className="text-moezia-dark/70">Olá, {nome ?? "Cliente"}</span>
          <LogoutButton loginPath={loginPath} />
        </div>
      </div>
    </header>
  );
}
