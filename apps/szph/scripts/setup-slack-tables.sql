-- Tables for Slack notifications
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)

-- Form submissions
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  message text,
  extra jsonb,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_forms" ON form_submissions;
CREATE POLICY "anon_insert_forms" ON form_submissions FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "service_all_forms" ON form_submissions;
CREATE POLICY "service_all_forms" ON form_submissions FOR ALL TO service_role USING (true);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter;
CREATE POLICY "anon_insert_newsletter" ON newsletter FOR INSERT TO anon WITH CHECK (true);
DROP POLICY IF EXISTS "service_all_newsletter" ON newsletter;
CREATE POLICY "service_all_newsletter" ON newsletter FOR ALL TO service_role USING (true);

-- Partners
CREATE TABLE IF NOT EXISTS partners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  logo_url text,
  tier text,
  website text,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_partners" ON partners;
CREATE POLICY "anon_read_partners" ON partners FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS "service_all_partners" ON partners;
CREATE POLICY "service_all_partners" ON partners FOR ALL TO service_role USING (true);

-- Collaborators
CREATE TABLE IF NOT EXISTS collaborators (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  email text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "service_all_collaborators" ON collaborators;
CREATE POLICY "service_all_collaborators" ON collaborators FOR ALL TO service_role USING (true);

-- Enable pg_net extension for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Webhook function: sends POST to /api/slack
CREATE OR REPLACE FUNCTION notify_slack()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  payload jsonb;
  webhook_url text := 'https://szphnew-fieldhockey.vercel.app/api/slack';
BEGIN
  payload := jsonb_build_object(
    'type', TG_ARGV[0] || ':' || TG_TABLE_NAME,
    'table', TG_TABLE_NAME,
    'record', to_jsonb(NEW)
  );

  PERFORM extensions.http_post(
    webhook_url,
    payload::text,
    'application/json'
  );

  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RETURN NEW; -- Don't block the insert if notification fails
END;
$$;

-- Triggers
DROP TRIGGER IF EXISTS slack_article_published ON articles;
CREATE TRIGGER slack_article_published
  AFTER INSERT ON articles
  FOR EACH ROW
  WHEN (NEW.status = 'published')
  EXECUTE FUNCTION notify_slack('INSERT');

DROP TRIGGER IF EXISTS slack_match_result ON matches;
CREATE TRIGGER slack_match_result
  AFTER UPDATE ON matches
  FOR EACH ROW
  WHEN (OLD.home_score IS NULL AND NEW.home_score IS NOT NULL)
  EXECUTE FUNCTION notify_slack('UPDATE');

DROP TRIGGER IF EXISTS slack_new_exercise ON exercises;
CREATE TRIGGER slack_new_exercise
  AFTER INSERT ON exercises
  FOR EACH ROW
  EXECUTE FUNCTION notify_slack('INSERT');

DROP TRIGGER IF EXISTS slack_new_partner ON partners;
CREATE TRIGGER slack_new_partner
  AFTER INSERT ON partners
  FOR EACH ROW
  EXECUTE FUNCTION notify_slack('INSERT');

DROP TRIGGER IF EXISTS slack_newsletter ON newsletter;
CREATE TRIGGER slack_newsletter
  AFTER INSERT ON newsletter
  FOR EACH ROW
  EXECUTE FUNCTION notify_slack('INSERT');

DROP TRIGGER IF EXISTS slack_new_collaborator ON collaborators;
CREATE TRIGGER slack_new_collaborator
  AFTER INSERT ON collaborators
  FOR EACH ROW
  EXECUTE FUNCTION notify_slack('INSERT');
