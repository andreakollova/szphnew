import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  cookieStore.delete("admin_role");
  cookieStore.delete("admin_username");

  const url = new URL("/admin/prihlasenie", req.nextUrl.origin);
  return NextResponse.redirect(url);
}
