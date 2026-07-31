import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PortalHeader from "@/components/PortalHeader";

export default async function ProtectedPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-moezia-cream">
      <PortalHeader nome={session?.user?.name} />
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
