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
  const role = cookieStore.get("admin_role")?.value || "zapasy";
  const username = cookieStore.get("admin_username")?.value || "admin";

  if (!session || session.value !== "authenticated") {
    redirect("/admin/prihlasenie");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar role={role} username={username} />
      <main className="flex-1 lg:pl-64">
        <div className="min-h-screen p-6 md:p-8" style={{ background: "#f8f9fa" }}>{children}</div>
      </main>
    </div>
  );
}
