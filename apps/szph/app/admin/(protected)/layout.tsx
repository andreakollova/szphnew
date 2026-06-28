import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AdminSidebar } from "../components/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/prihlasenie");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 lg:pl-64">
        <div className="min-h-screen p-6 md:p-8">{children}</div>
      </main>
    </div>
  );
}
