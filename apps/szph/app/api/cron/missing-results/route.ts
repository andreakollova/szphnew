import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { notifyMissingResults } from "@/lib/slack";

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sets this automatically)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Find matches from yesterday or earlier that are still "scheduled" (no result)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const { data: matches } = await supabase
    .from("matches")
    .select("*")
    .eq("status", "scheduled")
    .lt("date", yesterday.toISOString())
    .order("date", { ascending: false })
    .limit(20);

  if (!matches || matches.length === 0) {
    return NextResponse.json({ ok: true, message: "No missing results" });
  }

  const formatted = matches.map((m: any) => ({
    home_team: m.home_team_name ?? m.home_team_id,
    away_team: m.away_team_name ?? m.away_team_id,
    date: new Date(m.date).toLocaleDateString("sk-SK"),
    competition: m.competition_name,
  }));

  await notifyMissingResults(formatted);

  return NextResponse.json({ ok: true, notified: matches.length });
}
