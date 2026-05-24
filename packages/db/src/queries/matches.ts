import type { SupabaseClient } from "@supabase/supabase-js";
import type { Match, MatchStatus, TeamCategory, VisibleOn, StandingsRow } from "../types";

const MATCH_SELECT = `
  *,
  competition:competitions(*),
  home_team:teams!matches_home_team_id_fkey(*),
  away_team:teams!matches_away_team_id_fkey(*)
`;

export async function getUpcomingMatches(
  supabase: SupabaseClient,
  options: {
    site?: VisibleOn;
    category?: TeamCategory;
    limit?: number;
  } = {}
): Promise<Match[]> {
  const { site, category, limit = 10 } = options;

  let query = supabase
    .from("matches")
    .select(MATCH_SELECT)
    .in("status", ["scheduled", "live"])
    .gte("match_date", new Date().toISOString())
    .order("match_date", { ascending: true })
    .limit(limit);

  if (site && site !== "both") {
    query = query.in("visible_on", [site, "both"]);
  }

  const { data, error } = await query;
  if (error) throw error;

  let matches = (data ?? []) as Match[];
  if (category) {
    matches = matches.filter((m) => m.competition?.category === category);
  }
  return matches;
}

export async function getMatchesByCompetition(
  supabase: SupabaseClient,
  competitionId: string,
  options: { status?: MatchStatus; limit?: number } = {}
): Promise<Match[]> {
  const { status, limit = 50 } = options;

  let query = supabase
    .from("matches")
    .select(MATCH_SELECT)
    .eq("competition_id", competitionId)
    .order("match_date", { ascending: true })
    .limit(limit);

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Match[];
}

export async function getAllMatches(
  supabase: SupabaseClient,
  options: { limit?: number; offset?: number } = {}
): Promise<Match[]> {
  const { limit = 50, offset = 0 } = options;
  const { data, error } = await supabase
    .from("matches")
    .select(MATCH_SELECT)
    .order("match_date", { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return (data ?? []) as Match[];
}

export async function createMatch(
  supabase: SupabaseClient,
  match: Omit<Match, "id" | "created_at" | "updated_at" | "competition" | "home_team" | "away_team">
): Promise<Match> {
  const { data, error } = await supabase
    .from("matches")
    .insert(match)
    .select(MATCH_SELECT)
    .single();
  if (error) throw error;
  return data as Match;
}

export async function updateMatch(
  supabase: SupabaseClient,
  id: string,
  match: Partial<Omit<Match, "id" | "created_at" | "updated_at" | "competition" | "home_team" | "away_team">>
): Promise<Match> {
  const { data, error } = await supabase
    .from("matches")
    .update({ ...match, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select(MATCH_SELECT)
    .single();
  if (error) throw error;
  return data as Match;
}

export async function deleteMatch(
  supabase: SupabaseClient,
  id: string
): Promise<void> {
  const { error } = await supabase.from("matches").delete().eq("id", id);
  if (error) throw error;
}

// Vypočíta tabuľku ligy z výsledkov
export function calculateStandings(matches: Match[]): StandingsRow[] {
  const teamMap = new Map<string, StandingsRow>();

  const getTeam = (team: Match["home_team"]): StandingsRow => {
    if (!team) throw new Error("Team missing");
    if (!teamMap.has(team.id)) {
      teamMap.set(team.id, {
        team,
        played: 0, won: 0, drawn: 0, lost: 0,
        goals_for: 0, goals_against: 0, goal_diff: 0, points: 0,
      });
    }
    return teamMap.get(team.id)!;
  };

  for (const match of matches) {
    if (
      match.status !== "finished" ||
      match.home_score === null ||
      match.away_score === null ||
      !match.home_team ||
      !match.away_team
    ) continue;

    const home = getTeam(match.home_team);
    const away = getTeam(match.away_team);

    home.played++;
    away.played++;
    home.goals_for += match.home_score;
    home.goals_against += match.away_score;
    away.goals_for += match.away_score;
    away.goals_against += match.home_score;

    if (match.home_score > match.away_score) {
      home.won++; home.points += 3;
      away.lost++;
    } else if (match.home_score < match.away_score) {
      away.won++; away.points += 3;
      home.lost++;
    } else {
      home.drawn++; home.points += 1;
      away.drawn++; away.points += 1;
    }
  }

  return Array.from(teamMap.values())
    .map((r) => ({ ...r, goal_diff: r.goals_for - r.goals_against }))
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goal_diff !== a.goal_diff) return b.goal_diff - a.goal_diff;
      return b.goals_for - a.goals_for;
    });
}
