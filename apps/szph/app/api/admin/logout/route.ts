import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@szph/db/client";

export async function POST() {
  const cookieStore = await cookies();
  const supabase = createServerSupabaseClient(cookieStore);
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/admin/prihlasenie", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"));
}
