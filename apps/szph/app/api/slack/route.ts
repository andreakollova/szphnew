import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  notifyArticlePublished,
  notifyMatchResult,
  notifyFormSubmission,
  notifyNewPartner,
  notifyNewExercise,
  notifyNewsletterSignup,
  notifyNewCollaborator,
  notifyNewProject,
  notifyWeeklyResultsComplete,
} from "@/lib/slack";

const IG_SERVICE_URL = process.env.IG_SERVICE_URL || "https://szph-instagram.onrender.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Supabase Database Webhooks send: { type, table, record, old_record }
    // Manual API calls send: { type, data }
    const type = body.type;
    const record = body.record ?? body.data;

    switch (type) {
      case "article_published":
      case "INSERT:articles":
        if (record?.status === "published") {
          await notifyArticlePublished({
            title: record.title,
            slug: record.slug,
            category: record.category,
            visible_on: record.visible_on,
          });
        }
        break;

      case "match_result":
      case "UPDATE:matches":
        if (record?.home_score != null && record?.away_score != null) {
          await notifyMatchResult({
            home_team: record.home_team_name ?? record.home_team ?? "Domáci",
            away_team: record.away_team_name ?? record.away_team ?? "Hostia",
            home_score: record.home_score,
            away_score: record.away_score,
            competition: record.competition_name ?? record.league,
          });

          // Check if all weekly matches for this league are complete → trigger IG post
          if (record.league) {
            try {
              const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
              const now = new Date();
              const day = now.getDay();
              const monday = new Date(now);
              monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
              monday.setHours(0, 0, 0, 0);
              const sunday = new Date(monday);
              sunday.setDate(monday.getDate() + 6);
              sunday.setHours(23, 59, 59, 999);

              const { data: pending } = await supabase
                .from("matches")
                .select("id")
                .eq("site", "szph")
                .eq("league", record.league)
                .eq("status", "scheduled")
                .gte("date", monday.toISOString())
                .lte("date", sunday.toISOString());

              if (!pending || pending.length === 0) {
                // All matches complete — trigger Instagram post generation
                await fetch(`${IG_SERVICE_URL}/webhook/results-complete`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ category: record.league }),
                }).catch(() => {});
              }
            } catch {}
          }
        }
        break;

      case "form_submission":
        await notifyFormSubmission(record);
        break;

      case "INSERT:partners":
        await notifyNewPartner({ name: record.name, tier: record.tier });
        break;

      case "INSERT:exercises":
        await notifyNewExercise({
          title: record.title,
          category: record.category,
          slug: record.slug,
        });
        break;

      case "newsletter_signup":
      case "INSERT:newsletter":
        await notifyNewsletterSignup(record.email ?? record);
        break;

      case "INSERT:collaborators":
        await notifyNewCollaborator({
          name: record.name,
          role: record.role,
          email: record.email,
        });
        break;

      case "INSERT:projects":
        await notifyNewProject({ name: record.name ?? record.title });
        break;

      case "weekly_results_complete":
        await notifyWeeklyResultsComplete(record.count ?? 0);
        break;

      default:
        return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Slack notification error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
