-- Add video_url and goals columns to matches table
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS video_url TEXT;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS goals JSONB;

COMMENT ON COLUMN public.matches.video_url IS 'URL to match video (YouTube, etc.)';
COMMENT ON COLUMN public.matches.goals IS 'JSON array of goal scorers: [{"team":"home","player":"#7 Ján Novák","minute":"23"}]';
