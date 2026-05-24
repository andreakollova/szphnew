-- ============================================================
-- SZPH Seed dáta — reálne slovenské kluby
-- POZOR: Spusti AŽ PO vytvorení admin používateľa cez Auth!
-- Nahraď 'YOUR_ADMIN_USER_ID' skutočným UUID z auth.users
-- ============================================================

-- ============================================================
-- TÍMY
-- ============================================================
INSERT INTO public.teams (id, name, short_name, category) VALUES
  -- Muži
  ('11111111-0001-0001-0001-000000000001', 'KPH Rača Bratislava', 'KPH Rača', 'muzi'),
  ('11111111-0001-0001-0001-000000000002', 'KPH HOKO Zlaté Moravce', 'HOKO ZM', 'muzi'),
  ('11111111-0001-0001-0001-000000000003', 'Hokejová akadémia Šenkvice', 'HA Šenkvice', 'muzi'),
  ('11111111-0001-0001-0001-000000000004', 'TJ Slavia Šamorín', 'Slavia ŠA', 'muzi'),
  ('11111111-0001-0001-0001-000000000005', 'SK Senec', 'SK Senec', 'muzi'),
  ('11111111-0001-0001-0001-000000000006', 'Kaptár SE', 'Kaptár', 'muzi'),
  ('11111111-0001-0001-0001-000000000007', 'Nova Dubnica', 'N. Dubnica', 'muzi'),
  -- Ženy
  ('11111111-0001-0002-0001-000000000001', 'KPH Rača Bratislava', 'KPH Rača', 'zeny'),
  ('11111111-0001-0002-0001-000000000002', 'KPH HOKO Zlaté Moravce', 'HOKO ZM', 'zeny'),
  ('11111111-0001-0002-0001-000000000003', 'Szent László DSE', 'Sz. László', 'zeny'),
  -- U18
  ('11111111-0001-0003-0001-000000000001', 'KPH Rača Bratislava', 'KPH Rača', 'U18'),
  ('11111111-0001-0003-0001-000000000002', 'Hokejová akadémia Šenkvice', 'HA Šenkvice', 'U18'),
  ('11111111-0001-0003-0001-000000000003', 'KPH HOKO Zlaté Moravce', 'HOKO ZM', 'U18'),
  -- U14
  ('11111111-0001-0004-0001-000000000001', 'KPH Rača Bratislava', 'KPH Rača', 'U14'),
  ('11111111-0001-0004-0001-000000000002', 'Hokejová akadémia Šenkvice', 'HA Šenkvice', 'U14'),
  ('11111111-0001-0004-0001-000000000003', 'KPH HOKO Zlaté Moravce', 'HOKO ZM', 'U14'),
  ('11111111-0001-0004-0001-000000000004', 'Kaptár SE', 'Kaptár', 'U14'),
  -- U12
  ('11111111-0001-0005-0001-000000000001', 'KPH Rača Bratislava', 'KPH Rača', 'U12'),
  ('11111111-0001-0005-0001-000000000002', 'Hokejová akadémia Šenkvice', 'HA Šenkvice', 'U12'),
  ('11111111-0001-0005-0001-000000000003', 'Kaptár SE', 'Kaptár', 'U12')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SÚŤAŽE
-- ============================================================
INSERT INTO public.competitions (id, name, season, type, category) VALUES
  ('22222222-0001-0001-0001-000000000001', 'Mužská liga', '2025/2026', 'liga', 'muzi'),
  ('22222222-0001-0001-0001-000000000002', 'Ženská liga', '2025/2026', 'liga', 'zeny'),
  ('22222222-0001-0001-0001-000000000003', 'Liga U18', '2025/2026', 'liga', 'U18'),
  ('22222222-0001-0001-0001-000000000004', 'Liga U14', '2025/2026', 'liga', 'U14'),
  ('22222222-0001-0001-0001-000000000005', 'Liga U12', '2025/2026', 'liga', 'U12')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ZÁPASY (podľa snímok obrazovky)
-- ============================================================
INSERT INTO public.matches (competition_id, home_team_id, away_team_id, match_date, venue, home_score, away_score, status, visible_on) VALUES
  -- Ženská liga
  ('22222222-0001-0001-0001-000000000002',
   '11111111-0001-0002-0001-000000000001',
   '11111111-0001-0002-0001-000000000002',
   '2026-05-24 10:00:00+02', 'Zlaté Moravce', NULL, NULL, 'finished', 'both'),

  ('22222222-0001-0001-0001-000000000002',
   '11111111-0001-0002-0001-000000000002',
   '11111111-0001-0002-0001-000000000001',
   '2026-05-24 11:00:00+02', 'Zlaté Moravce', NULL, NULL, 'finished', 'both'),

  ('22222222-0001-0001-0001-000000000002',
   '11111111-0001-0002-0001-000000000001',
   '11111111-0001-0002-0001-000000000003',
   '2026-06-07 11:00:00+02', 'Zlaté Moravce', NULL, NULL, 'scheduled', 'both'),

  ('22222222-0001-0001-0001-000000000002',
   '11111111-0001-0002-0001-000000000003',
   '11111111-0001-0002-0001-000000000002',
   '2026-06-07 12:00:00+02', 'Zlaté Moravce', NULL, NULL, 'scheduled', 'both'),

  -- U14
  ('22222222-0001-0001-0001-000000000004',
   '11111111-0001-0004-0001-000000000001',
   '11111111-0001-0004-0001-000000000002',
   '2026-06-14 09:00:00+02', 'Šenkvice', NULL, NULL, 'scheduled', 'both'),

  ('22222222-0001-0001-0001-000000000004',
   '11111111-0001-0004-0001-000000000002',
   '11111111-0001-0004-0001-000000000004',
   '2026-06-14 10:30:00+02', 'Šenkvice', NULL, NULL, 'scheduled', 'both'),

  ('22222222-0001-0001-0001-000000000004',
   '11111111-0001-0004-0001-000000000003',
   '11111111-0001-0004-0001-000000000002',
   '2026-06-14 12:00:00+02', 'Šenkvice', NULL, NULL, 'scheduled', 'both'),

  ('22222222-0001-0001-0001-000000000004',
   '11111111-0001-0004-0001-000000000004',
   '11111111-0001-0004-0001-000000000001',
   '2026-06-14 13:30:00+02', 'Šenkvice', NULL, NULL, 'scheduled', 'both'),

  -- U12
  ('22222222-0001-0001-0001-000000000005',
   '11111111-0001-0005-0001-000000000001',
   '11111111-0001-0005-0001-000000000003',
   '2026-05-30 13:30:00+02', 'Šenkvice', 3, 0, 'finished', 'both'),

  ('22222222-0001-0001-0001-000000000005',
   '11111111-0001-0005-0001-000000000003',
   '11111111-0001-0005-0001-000000000002',
   '2026-05-30 15:30:00+02', 'Šenkvice', 0, 3, 'finished', 'both')
ON CONFLICT DO NOTHING;

-- ============================================================
-- DEMO ČLÁNKY
-- ============================================================
INSERT INTO public.articles (slug, title, excerpt, content, category, visible_on, status, published_at) VALUES
  (
    'reprezentacia-zieny-vitazstvo-europska-liga',
    'Ženská reprezentácia zvíťazila v Európskej lige',
    'Slovenky predviedli skvelý výkon a postúpili do ďalšieho kola.',
    '## Historický úspech\n\nSlovenská ženská reprezentácia v pozemnom hokeji dosiahla historický úspech...',
    'reprezentacia', 'both', 'published', NOW() - INTERVAL '2 days'
  ),
  (
    'nova-sezona-2025-2026-startuje',
    'Nová sezóna 2025/2026 odštartovala',
    'Slovenská liga pozemného hokeja spúšťa novú sezónu s 8 tímami.',
    '## Nová sezóna\n\nSlovenský zväz pozemného hokeja oznamuje start novej sezóny 2025/2026...',
    'novinky', 'both', 'published', NOW() - INTERVAL '7 days'
  ),
  (
    'kph-raca-vitaz-ligy-muzov',
    'KPH Rača víťaz mužskej ligy!',
    'Bratislavský klub si po dramatickom záverečnom kole odniesol titul.',
    '## Titul pre Raču\n\nKPH Rača Bratislava oslavuje zisk majstrovského titulu...',
    'kluby', 'fieldhockey', 'published', NOW() - INTERVAL '14 days'
  ),
  (
    'dokumenty-smernice-sezony-2025-2026',
    'Smernice pre sezónu 2025/2026',
    'SZPH zverejnil aktualizované smernice a predpisy pre novú sezónu.',
    '## Smernice SZPH\n\nSlovenský zväz pozemného hokeja zverejnil aktualizované dokumenty...',
    'oznamy', 'szph', 'published', NOW() - INTERVAL '10 days'
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- DEMO VIDEÁ
-- ============================================================
INSERT INTO public.videos (title, youtube_url, visible_on, status, published_at) VALUES
  ('Highlights: Slovensko vs Česko 3:2', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'both', 'published', NOW() - INTERVAL '3 days'),
  ('Tréning ženská reprezentácia 2026', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'both', 'published', NOW() - INTERVAL '5 days'),
  ('Najlepšie góly sezóny 2025/2026', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'fieldhockey', 'published', NOW() - INTERVAL '8 days')
ON CONFLICT DO NOTHING;

-- ============================================================
-- PARTNERI
-- ============================================================
INSERT INTO public.partners (name, url, tier, sort_order) VALUES
  ('Ministerstvo školstva SR', 'https://www.minedu.sk', 'oficialny', 1),
  ('Slovenský olympijský a športový výbor', 'https://www.olympic.sk', 'oficialny', 2),
  ('Národné športové centrum', 'https://www.nsc.sk', 'institucionalny', 3),
  ('FIH — Medzinárodná federácia pozemného hokeja', 'https://www.fih.hockey', 'institucionalny', 4)
ON CONFLICT DO NOTHING;
