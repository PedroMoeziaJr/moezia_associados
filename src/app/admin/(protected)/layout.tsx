import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminHeader from "@/components/AdminHeader";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-moezia-cream">
      <AdminHeader nome={session?.user?.name} />
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
