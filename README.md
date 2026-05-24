# SZPH Monorepo

Monorepo pre dve webové stránky Slovenského zväzu pozemného hokeja:
- **fieldhockey.sk** — fanúšikovská, lifestyle stránka
- **szph.sk** — inštitucionálna stránka + CMS admin panel

## Tech Stack

- **Monorepo:** Turborepo + pnpm workspaces
- **Frontend:** Next.js 15, React 19, TypeScript (strict)
- **Styling:** Tailwind CSS v4 + CSS premenné (data-brand theming)
- **Backend:** Supabase (Postgres + Auth + Storage + RLS)
- **Animácie:** Framer Motion
- **Deploy:** Vercel (2 projekty z 1 repa)

## Štruktúra

```
apps/
  fieldhockey/   → fieldhockey.sk (port 3000)
  szph/          → szph.sk + /admin (port 3001)
packages/
  ui/            → zdieľané komponenty + design system
  db/            → Supabase klient, typy, queries
  config/        → tsconfig, tailwind preset
```

## Lokálny vývoj

### 1. Prerekvizity

```bash
node -v   # >= 20
pnpm -v   # >= 8 (inštalácia: curl -fsSL https://get.pnpm.io/install.sh | sh -)
```

### 2. Inštalácia

```bash
pnpm install
```

### 3. Supabase migrácie

1. Otvor [Supabase SQL Editor](https://supabase.com/dashboard/project/vcwgztguqqeaygcunynn/sql)
2. Spusti `packages/db/migrations/001_initial.sql`
3. Spusti `packages/db/migrations/002_rls.sql`
4. (Voliteľné) Spusti `packages/db/seed/seed.sql` — **až po vytvorení admin účtu!**

### 4. Storage buckety

V Supabase dashboard → Storage → New bucket, vytvor:
- `articles-covers` (public)
- `team-logos` (public)
- `video-thumbnails` (public)
- `partner-logos` (public)

(Alebo sú súčasťou `002_rls.sql` — skontroluj výstup.)

### 5. Admin účet

V Supabase dashboard → Authentication → Users → Invite user alebo Add user.
Po vytvorení účtu nastav rolu v `profiles` tabuľke:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'tvoj@email.sk';
```

### 6. ENV premenné

Súbory `.env.local` sú predvyplnené (URL + anon key). Doplň len:

```
SUPABASE_SERVICE_ROLE_KEY=...
```

Nájdeš ho v Supabase → Settings → API → service_role key.

### 7. Spustenie

```bash
# Oba weby naraz
pnpm dev

# Len fieldhockey.sk (port 3000)
pnpm dev:fieldhockey

# Len szph.sk + admin (port 3001)
pnpm dev:szph
```

Admin panel: http://localhost:3001/admin

### 8. Fonty Garet

Fonty sú v `.otf` formáte. Pre produkciu ich skonvertuj na `.woff2`:
1. Choď na https://cloudconvert.com/otf-to-woff2
2. Konvertuj súbory z `packages/ui/fonts/garet/`
3. Ulož ako `.woff2` do rovnakého priečinka
4. V `packages/ui/src/fonts.ts` odkomentuj `localFont` sekciu

## Deploy na Vercel

### Vercel Projekt 1 — fieldhockey.sk

```
Root Directory: apps/fieldhockey
Build Command:  cd ../.. && pnpm build --filter=fieldhockey
Output Dir:     .next
Install:        cd ../.. && pnpm install
```

**ENV premenné na Vercel:**
```
NEXT_PUBLIC_SUPABASE_URL=https://vcwgztguqqeaygcunynn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
NEXT_PUBLIC_SITE_URL=https://fieldhockey.sk
```

### Vercel Projekt 2 — szph.sk

```
Root Directory: apps/szph
Build Command:  cd ../.. && pnpm build --filter=szph
Output Dir:     .next
Install:        cd ../.. && pnpm install
```

**ENV premenné na Vercel:**
```
NEXT_PUBLIC_SUPABASE_URL=https://vcwgztguqqeaygcunynn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
NEXT_PUBLIC_SITE_URL=https://szph.sk
```

## TODO / Manuálne kroky

### Povinné pred spustením
- [ ] Spustiť SQL migrácie v Supabase
- [ ] Vytvoriť Storage buckety v Supabase
- [ ] Vytvoriť admin používateľa + nastaviť rolu
- [ ] Doplniť `SUPABASE_SERVICE_ROLE_KEY` do `.env.local`
- [ ] Nahrať logá tímov v admin paneli (timy sú vytvorené bez URL, len s názvami)

### Fonty
- [ ] Skonvertovať Garet OTF → WOFF2 (nástroj: cloudconvert.com)
- [ ] Odkomentovať `localFont` v `packages/ui/src/fonts.ts`

### Obsah
- [ ] Pridať reálne fotky hráčov pre hero sekcie (momentálne sú `banner1.jpg`, `banner2.jpg`)
- [ ] Vytvoriť prvé články v admin paneli
- [ ] Nahrať logá partnerov

### Funkcie na doplnenie
- [ ] Stránka `/novinky/[slug]` — detail článku (server component + markdown render)
- [ ] Stránka `/admin/zapasy/[id]` — edit existujúceho zápasu
- [ ] Stránka `/admin/timy/[id]` — edit existujúceho tímu
- [ ] Stránka `/admin/stranky/nova` + `/admin/stranky/[id]` — editor stránok
- [ ] Logout route `/admin/api/logout`
- [ ] Newsletter sekcia (napojiť na Mailchimp/Resend)
- [ ] SEO — sitemap.xml, robots.txt
- [ ] PWA manifest

## Design System

Farby sú definované cez CSS premenné v `packages/ui/src/styles/globals.css`.
Theming cez `data-brand="fieldhockey"` / `data-brand="szph"` na `<html>`.

Komponenty:
- `<GlassCard>` — liquid glass karta s backdrop blur
- `<GlassPanel>` — glass panel s noise texture
- `<MatchCard>` — karta zápasu so skóre
- `<ArticleCard>` — karta článku s fotkou
- `<VideoCard>` — video thumbnail karta
- `<MatchCenter>` — kompletné zápasové centrum s tabuľkou
- `<Navbar>` — sticky navigácia s hamburger menu
- `<Footer>` — footer s odkazmi a social ikonami
