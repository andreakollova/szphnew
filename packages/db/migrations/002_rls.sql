-- ============================================================
-- Row Level Security politiky
-- ============================================================

-- Helper: je aktuálny používateľ admin alebo editor?
CREATE OR REPLACE FUNCTION public.is_admin_or_editor()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'editor')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- PROFILES
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_select_admin" ON public.profiles
  FOR SELECT USING (public.is_admin_or_editor());

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================================
-- ARTICLES
-- ============================================================
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Verejné čítanie publikovaných
CREATE POLICY "articles_select_published" ON public.articles
  FOR SELECT USING (status = 'published');

-- Admin/editor číta všetko
CREATE POLICY "articles_select_admin" ON public.articles
  FOR SELECT USING (public.is_admin_or_editor());

-- Admin/editor môže vytvárať
CREATE POLICY "articles_insert_admin" ON public.articles
  FOR INSERT WITH CHECK (public.is_admin_or_editor());

-- Admin/editor môže upravovať
CREATE POLICY "articles_update_admin" ON public.articles
  FOR UPDATE USING (public.is_admin_or_editor());

-- Len admin môže mazať
CREATE POLICY "articles_delete_admin" ON public.articles
  FOR DELETE USING (public.is_admin());

-- ============================================================
-- VIDEOS
-- ============================================================
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "videos_select_published" ON public.videos
  FOR SELECT USING (status = 'published');

CREATE POLICY "videos_select_admin" ON public.videos
  FOR SELECT USING (public.is_admin_or_editor());

CREATE POLICY "videos_insert_admin" ON public.videos
  FOR INSERT WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "videos_update_admin" ON public.videos
  FOR UPDATE USING (public.is_admin_or_editor());

CREATE POLICY "videos_delete_admin" ON public.videos
  FOR DELETE USING (public.is_admin());

-- ============================================================
-- TEAMS
-- ============================================================
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teams_select_all" ON public.teams
  FOR SELECT USING (true);

CREATE POLICY "teams_insert_admin" ON public.teams
  FOR INSERT WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "teams_update_admin" ON public.teams
  FOR UPDATE USING (public.is_admin_or_editor());

CREATE POLICY "teams_delete_admin" ON public.teams
  FOR DELETE USING (public.is_admin());

-- ============================================================
-- COMPETITIONS
-- ============================================================
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "competitions_select_all" ON public.competitions
  FOR SELECT USING (true);

CREATE POLICY "competitions_insert_admin" ON public.competitions
  FOR INSERT WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "competitions_update_admin" ON public.competitions
  FOR UPDATE USING (public.is_admin_or_editor());

CREATE POLICY "competitions_delete_admin" ON public.competitions
  FOR DELETE USING (public.is_admin());

-- ============================================================
-- MATCHES
-- ============================================================
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "matches_select_all" ON public.matches
  FOR SELECT USING (true);

CREATE POLICY "matches_insert_admin" ON public.matches
  FOR INSERT WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "matches_update_admin" ON public.matches
  FOR UPDATE USING (public.is_admin_or_editor());

CREATE POLICY "matches_delete_admin" ON public.matches
  FOR DELETE USING (public.is_admin());

-- ============================================================
-- PARTNERS
-- ============================================================
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "partners_select_all" ON public.partners
  FOR SELECT USING (true);

CREATE POLICY "partners_insert_admin" ON public.partners
  FOR INSERT WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "partners_update_admin" ON public.partners
  FOR UPDATE USING (public.is_admin_or_editor());

CREATE POLICY "partners_delete_admin" ON public.partners
  FOR DELETE USING (public.is_admin());

-- ============================================================
-- PAGES
-- ============================================================
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pages_select_published" ON public.pages
  FOR SELECT USING (status = 'published');

CREATE POLICY "pages_select_admin" ON public.pages
  FOR SELECT USING (public.is_admin_or_editor());

CREATE POLICY "pages_insert_admin" ON public.pages
  FOR INSERT WITH CHECK (public.is_admin_or_editor());

CREATE POLICY "pages_update_admin" ON public.pages
  FOR UPDATE USING (public.is_admin_or_editor());

CREATE POLICY "pages_delete_admin" ON public.pages
  FOR DELETE USING (public.is_admin());

-- ============================================================
-- Supabase Storage buckets
-- ============================================================
-- Spusti v Supabase dashboard: Storage > New bucket
-- Buckety: articles-covers (public), team-logos (public), video-thumbnails (public), partner-logos (public)

INSERT INTO storage.buckets (id, name, public) VALUES
  ('articles-covers', 'articles-covers', true),
  ('team-logos', 'team-logos', true),
  ('video-thumbnails', 'video-thumbnails', true),
  ('partner-logos', 'partner-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage politiky — verejné čítanie
CREATE POLICY "articles_covers_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'articles-covers');

CREATE POLICY "team_logos_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'team-logos');

CREATE POLICY "video_thumbnails_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'video-thumbnails');

CREATE POLICY "partner_logos_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'partner-logos');

-- Storage politiky — upload len pre prihlásených
CREATE POLICY "articles_covers_admin_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'articles-covers' AND public.is_admin_or_editor()
  );

CREATE POLICY "team_logos_admin_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'team-logos' AND public.is_admin_or_editor()
  );

CREATE POLICY "video_thumbnails_admin_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'video-thumbnails' AND public.is_admin_or_editor()
  );

CREATE POLICY "partner_logos_admin_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'partner-logos' AND public.is_admin_or_editor()
  );
