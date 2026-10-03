import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { notifyFormSubmission } from "@/lib/slack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, email, message, ...extra } = body;

    if (!type || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Supabase (if table exists)
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
      );
      await supabase.from("form_submissions").insert({
        type, name, email, message,
        extra: Object.keys(extra).length > 0 ? extra : null,
      });
    } catch { /* table might not exist yet */ }

    // Send Slack notification
    await notifyFormSubmission({ type, name, email, message, extra });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
