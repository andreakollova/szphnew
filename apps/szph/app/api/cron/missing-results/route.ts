import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { notifyMissingResults, notifyWeeklyResultsComplete } from "@/lib/slack";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Get start of current week (Monday)
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  monday.setHours(0, 0, 0, 0);

  // Find matches this week that are still "scheduled" (no result filled)
  const { data: missingMatches } = await supabase
    .from("matches")
    .select("*")
    .eq("status", "scheduled")
    .eq("site", "szph")
    .lt("date", now.toISOString())
    .gte("date", monday.toISOString())
    .order("date", { ascending: false })
    .limit(30);

  // Find completed matches this week
  const { data: completedMatches } = await supabase
    .from("matches")
    .select("id")
    .eq("site", "szph")
    .eq("status", "finished")
    .gte("date", monday.toISOString())
    .lte("date", now.toISOString());

  if (missingMatches && missingMatches.length > 0) {
    const formatted = missingMatches.map((m: any) => ({
      home_team: m.home_team ?? "Domáci",
      away_team: m.away_team ?? "Hostia",
      date: new Date(m.date).toLocaleDateString("sk-SK"),
      competition: m.league,
    }));
    await notifyMissingResults(formatted);
    return NextResponse.json({ ok: true, missing: missingMatches.length });
  }

  // If no missing and we have completed matches, all results are in
  if (completedMatches && completedMatches.length > 0) {
    await notifyWeeklyResultsComplete(completedMatches.length);
    return NextResponse.json({ ok: true, complete: completedMatches.length });
  }

  return NextResponse.json({ ok: true, message: "No matches this week" });
}
