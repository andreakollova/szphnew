// Generované manuálne — po spustení Supabase projektu spusti:
// supabase gen types typescript --project-id vcwgztguqqeaygcunynn > packages/db/src/types.generated.ts

export type VisibleOn = "fieldhockey" | "szph" | "both";
export type Status = "draft" | "published";
export type MatchStatus = "scheduled" | "live" | "finished" | "postponed";
export type ArticleCategory = "novinky" | "reprezentacia" | "kluby" | "oznamy";
export type TeamCategory = "muzi" | "zeny" | "U18" | "U14" | "U12";
export type CompetitionType = "liga" | "turnaj";
export type PartnerTier = "oficialny" | "institucionalny";
export type UserRole = "admin" | "editor";
export type PageSite = "fieldhockey" | "szph";
export type ContentBlockType = "heading" | "text" | "image" | "gallery";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
  level?: 1 | 2 | 3;
  url?: string;
  alt?: string;
  caption?: string;
  images?: Array<{ url: string; alt?: string }>;
}

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  category: ArticleCategory;
  visible_on: VisibleOn;
  status: Status;
  published_at: string | null;
  author_id: string | null;
  created_at: string;
  updated_at: string;
  // joined
  author?: Profile | null;
}

export interface Video {
  id: string;
  title: string;
  youtube_url: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  duration: string | null;
  visible_on: VisibleOn;
  status: Status;
  published_at: string | null;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  short_name: string | null;
  logo_url: string | null;
  category: TeamCategory;
  created_at: string;
}

export interface Competition {
  id: string;
  name: string;
  season: string;
  type: CompetitionType;
  category: TeamCategory;
  created_at: string;
}

export interface Match {
  id: string;
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  match_date: string;
  venue: string | null;
  home_score: number | null;
  away_score: number | null;
  status: MatchStatus;
  visible_on: VisibleOn;
  created_at: string;
  updated_at: string;
  // joined
  competition?: Competition | null;
  home_team?: Team | null;
  away_team?: Team | null;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  url: string | null;
  tier: PartnerTier;
  sort_order: number;
  created_at: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: ContentBlock[];
  site: PageSite;
  status: Status;
  created_at: string;
  updated_at: string;
}

// Formulárové typy
export interface ArticleFormData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  category: ArticleCategory;
  visible_on: VisibleOn;
  status: Status;
}

export interface MatchFormData {
  competition_id: string;
  home_team_id: string;
  away_team_id: string;
  match_date: string;
  venue: string;
  status: MatchStatus;
  home_score: number | null;
  away_score: number | null;
  visible_on: VisibleOn;
}

export interface TeamFormData {
  name: string;
  short_name: string;
  logo_url: string;
  category: TeamCategory;
}

// Tabuľka ligy
export interface StandingsRow {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_diff: number;
  points: number;
}
