import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const SESSION_COOKIE = "admin_session";
const ROLE_COOKIE = "admin_role";
const USERNAME_COOKIE = "admin_username";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Check against admin_users table
  const { data: users } = await supabase
    .from("admin_users")
    .select("id, username, password, role, active")
    .eq("username", username)
    .eq("active", true)
    .limit(1);

  const user = users?.[0];

  // Fallback: hardcoded superadmin
  const isSuperadmin = username === "admin" && password === (process.env.ADMIN_PASSWORD || "admin");

  if (isSuperadmin || (user && user.password === password)) {
    const cookieStore = await cookies();
    const role = isSuperadmin ? "superadmin" : user!.role;
    const opts = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    };

    cookieStore.set(SESSION_COOKIE, "authenticated", opts);
    cookieStore.set(ROLE_COOKIE, role, opts);
    cookieStore.set(USERNAME_COOKIE, isSuperadmin ? "admin" : user!.username, opts);

    return NextResponse.json({ ok: true, role });
  }

  return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
}
