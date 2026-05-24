import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";
import { AdminSidebar } from "./components/AdminSidebar";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | SZPH Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/prihlasenie");
  }

  // Overenie roly
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || !["admin", "editor"].includes(profile.role)) {
    redirect("/admin/prihlasenie");
  }

  return (
    <html lang="sk" data-brand="szph">
      <body className="bg-[#020817] text-white">
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 lg:pl-64">
            <div className="min-h-screen p-6 md:p-8">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
