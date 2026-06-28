import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin";
const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
}
