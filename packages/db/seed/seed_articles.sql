-- ============================================================
-- SZPH — Vzorové články s plným obsahom
-- Spusti v Supabase SQL Editor
-- ============================================================

-- Vymaž staré demo články (ak existujú)
DELETE FROM public.articles WHERE slug IN (
  'reprezentacia-zieny-vitazstvo-europska-liga',
  'nova-sezona-2025-2026-startuje',
  'kph-raca-vitaz-ligy-muzov',
  'dokumenty-smernice-sezony-2025-2026',
  'vyrocna-konferencia-szph-2026',
  'europsky-sachampionat-bratislava-2026',
  'rozvoj-mladeze-dotacie-2026',
  'kph-raca-obhajuje-titul',
  'novy-sutazny-poriadok-2026-2027',
  'reprezentacia-zeny-eurohockey-2026'
);

INSERT INTO public.articles (slug, title, excerpt, content, cover_image_url, category, visible_on, status, published_at) VALUES

-- ═══════════════════════════════════════════════════════════
-- ČLÁNOK 1: Výročná konferencia
-- ═══════════════════════════════════════════════════════════
(
  'vyrocna-konferencia-szph-2026',
  'Výročná konferencia SZPH 2026 — prijaté rozhodnutia a nové vedenie',
  'Delegáti výročnej konferencie SZPH schválili nový rozpočet, plán rozvoja mládeže a zvolili nové predsedníctvo zväzu. Prinášame kompletný prehľad.',
  '## Konferencia v Bratislave

Dňa 15. júna 2026 sa v priestoroch Národného športového centra v Bratislave konala riadna výročná konferencia Slovenského zväzu pozemného hokeja. Zúčastnilo sa 42 delegátov zastupujúcich všetky registrované kluby.

## Kľúčové rozhodnutia

Delegáti jednohlasne schválili niekoľko dôležitých dokumentov a rozhodnutí, ktoré budú formovať budúcnosť pozemného hokeja na Slovensku:

- Schválenie rozpočtu na rok 2026/2027 vo výške 285 000 EUR
- Prijatie nového plánu rozvoja mládeže s dôrazom na regióny
- Aktualizácia stanov SZPH v súlade s legislatívnymi zmenami
- Vytvorenie novej komisie pre digitalizáciu a médiá

## Nové predsedníctvo

> Pozemný hokej na Slovensku má obrovský potenciál. Naším cieľom je priblížiť tento šport širšej verejnosti a vytvoriť podmienky pre rast na všetkých úrovniach. — Ing. Martin Kováč, novozvolený prezident SZPH

Konferencia zvolila nové predsedníctvo zväzu na obdobie 2026–2030. Novým prezidentom sa stal Ing. Martin Kováč, ktorý vo funkcii nahradil doterajšieho prezidenta PhDr. Petra Novotného.

## Plán rozvoja mládeže

Jedným z najdôležitejších bodov programu bol nový plán rozvoja mládežníckeho pozemného hokeja. Hlavné piliere zahŕňajú:

- Zavedenie programu „Hokejka do škôl" pre základné školy v 5 krajoch
- Zvýšenie počtu trénerov s UEFA B licenciou zo 14 na 25 do roku 2028
- Organizácia letných hokejových kempov pre deti od 6 do 14 rokov
- Spolupráca s českým a rakúskym zväzom na výmenných programoch

## Financovanie

Rozpočet na novú sezónu počíta s príjmami z dotácií MŠVVaŠ SR, príspevkov FIH a EuroHockey, ako aj z vlastných zdrojov vrátane sponzoringu. Oproti minulému roku sa rozpočet zvýšil o 12 %, čo je najväčší nárast za posledných 5 rokov.

### Rozdelenie rozpočtu

- Mládežnícky šport: 38 %
- Reprezentácia: 28 %
- Ligový šport: 20 %
- Administratíva a správa: 14 %

Ďalšie zasadnutie predsedníctva sa uskutoční 10. septembra 2026.',
  '/images/bannerbg2.png',
  'oznamy', 'szph', 'published', NOW() - INTERVAL '2 days'
),

-- ═══════════════════════════════════════════════════════════
-- ČLÁNOK 2: Európsky šampionát
-- ═══════════════════════════════════════════════════════════
(
  'europsky-sachampionat-bratislava-2026',
  'Bratislava bude hostiť Európsky šampionát v pozemnom hokeji 2026',
  'Slovensko získalo právo organizovať EuroHockey Championship III. Turnaj sa uskutoční v septembri v Bratislave za účasti 8 krajín.',
  '## Historický moment pre slovenský pozemný hokej

Slovenský zväz pozemného hokeja s radosťou oznamuje, že Bratislava bude hostiť EuroHockey Championship III v septembri 2026. Ide o najväčšiu medzinárodnú udalosť v pozemnom hokeji na Slovensku za posledné desaťročie.

## O turnaji

EuroHockey Championship III je súčasťou európskeho systému súťaží v pozemnom hokeji. Turnaj sa uskutoční od 14. do 21. septembra 2026 na novovybudovanom ihrisku pri Národnom športovom centre.

### Účastníci turnaja

- Slovensko (hostiteľská krajina)
- Chorvátsko
- Litva
- Turecko
- Švajčiarsko
- Portugalsko
- Gruzínsko
- Malta

## Príprava areálu

> Investícia do nového ihriska s umelým trávnikom najnovšej generácie je investíciou do budúcnosti slovenského pozemného hokeja. Ihrisko bude po turnaji slúžiť našim klubom a reprezentácii. — Ing. Martin Kováč, prezident SZPH

Mesto Bratislava v spolupráci so SZPH investovalo do kompletnej rekonštrukcie areálu. Nové ihrisko spĺňa najprísnejšie štandardy FIH a bude mať kapacitu pre 1 500 divákov.

## Vstupenky

Predaj vstupeniek začne 1. augusta 2026 cez oficiálny web szph.sk. Včasní záujemcovia môžu využiť zvýhodnené permanentky na celý turnaj.

- Denná vstupenka: 8 EUR
- Permanentka (celý turnaj): 35 EUR
- Študenti a seniori: 50 % zľava
- Deti do 12 rokov: vstup zdarma

## Dobrovoľníci

SZPH hľadá 60 dobrovoľníkov na pomoc počas turnaja. Prihlásiť sa môžete cez formulár na stránke szph.sk/dobrovolnici do 31. júla 2026.',
  '/images/bannerbg.png',
  'novinky', 'both', 'published', NOW() - INTERVAL '5 days'
),

-- ═══════════════════════════════════════════════════════════
-- ČLÁNOK 3: Rozvoj mládeže
-- ═══════════════════════════════════════════════════════════
(
  'rozvoj-mladeze-dotacie-2026',
  'SZPH získal dotácie MŠVVaŠ SR na rozvoj mládeže — 120 000 EUR pre kluby',
  'Ministerstvo školstva pridelilo SZPH historicky najvyššiu dotáciu na rozvoj mládežníckeho pozemného hokeja. Financie smerujú priamo do klubov.',
  '## Historicky najvyššia dotácia

Slovenský zväz pozemného hokeja získal od Ministerstva školstva, vedy, výskumu a športu SR dotáciu vo výške 120 000 EUR na rozvoj mládežníckeho pozemného hokeja. Ide o historicky najvyššiu sumu, ktorú SZPH od ministerstva obdržal.

## Rozdelenie financií

Dotácia bude rozdelená medzi registrované kluby podľa transparentného kľúča, ktorý zohľadňuje:

- Počet registrovaných hráčov do 18 rokov
- Kvalifikáciu trénerského tímu
- Výsledky v mládežníckych súťažiach
- Infraštruktúrne podmienky klubu

### Plánované využitie

- Nákup hokejovej výstroje pre mládežnícke tímy: 45 000 EUR
- Trénerské kurzy a vzdelávanie: 25 000 EUR
- Organizácia mládežníckych turnajov: 20 000 EUR
- Letné hokejové kempy: 15 000 EUR
- Cestovné na medzinárodné súťaže: 15 000 EUR

## Program „Hokejka do škôl"

> Chceme, aby každé dieťa na Slovensku dostalo príležitosť vyskúšať si pozemný hokej. Program Hokejka do škôl je prvým krokom. — Jana Novotná, koordinátorka mládeže SZPH

Súčasťou dotácie je aj pilotný program „Hokejka do škôl", ktorý sa spustí v septembri 2026 na 20 základných školách v Bratislavskom, Trnavskom a Nitrianskom kraji.

## Termín čerpania

Kluby môžu žiadať o pridelenie financií do 31. augusta 2026 prostredníctvom formulára na stránkach SZPH. Pridelené prostriedky musia byť vyčerpané do 30. júna 2027.',
  '/images/banner3.jpg',
  'novinky', 'szph', 'published', NOW() - INTERVAL '8 days'
),

-- ═══════════════════════════════════════════════════════════
-- ČLÁNOK 4: KPH Rača
-- ═══════════════════════════════════════════════════════════
(
  'kph-raca-obhajuje-titul',
  'KPH Rača vstupuje do sezóny ako obhajca titulu — posilnil káder o 3 hráčov',
  'Bratislavský klub si pred novou sezónou posilnil mužstvo o troch nových hráčov vrátane reprezentanta. Ambície sú jasné — obhajoba titulu.',
  '## Rača chce obhájiť

KPH Rača Bratislava, víťaz mužskej Extraligy 2025/2026, vstupuje do novej sezóny s jasným cieľom — obhajoba majstrovského titulu. Klub pred sezónou posilnil káder o troch hráčov.

## Nové posily

- Tomáš Horváth (26) — útočník, prišiel z rakúskeho HC Wien. Slovenský reprezentant s 34 gólmi v posledných dvoch sezónach v rakúskej lige.
- Marek Bednár (22) — stredopoliar, odchovanec HOKO Zlaté Moravce. Talentovaný mladý hráč, ktorý bol vyhlásený za najlepšieho hráča U21 minulej sezóny.
- Daniel Štefanec (29) — brankár, prišiel z českého Bohemians Praha. Skúsený brankár so 120 zápasmi v českej najvyššej súťaži.

## Trénerský tím

Na lavičke pokračuje hlavný tréner Ing. Pavol Mikuš, ktorý klub priviedol k titulu. Jeho asistentom sa stal bývalý reprezentant Jakub Kráľ.

> Máme kvalitný a vyvážený káder. Cieľom je nielen obhájiť titul, ale aj uspieť v európskych pohároch. — Pavol Mikuš, hlavný tréner KPH Rača

## Príprava na sezónu

Rača absolvovala prípravný kemp v Rakúsku, kde odohrala 4 prípravné zápasy s rakúskymi a nemeckými tímami. Výsledky:

- KPH Rača vs HC Wien 3:1
- KPH Rača vs SV Arminen 2:0
- KPH Rača vs UHC Hamburg 1:1
- KPH Rača vs HC Wiener Neustadt 4:2

## Prvý ligový zápas

Sezóna odštartuje 15. septembra 2026 domácim zápasom proti HOKO Zlaté Moravce. Výkop je naplánovaný na 14:00 v Rači.',
  '/images/banner4.jpg',
  'kluby', 'both', 'published', NOW() - INTERVAL '12 days'
),

-- ═══════════════════════════════════════════════════════════
-- ČLÁNOK 5: Súťažný poriadok
-- ═══════════════════════════════════════════════════════════
(
  'novy-sutazny-poriadok-2026-2027',
  'Nový súťažný poriadok pre sezónu 2026/2027 — hlavné zmeny',
  'Riadiaci zbor SZPH schválil aktualizovaný súťažný poriadok. Hlavné zmeny sa týkajú disciplinárnych konaní a organizácie turnajov.',
  '## Aktualizovaný poriadok

Riadiaci zbor Slovenského zväzu pozemného hokeja na svojom zasadnutí schválil nový súťažný poriadok pre sezónu 2026/2027. Dokument vstupuje do platnosti 1. septembra 2026.

## Hlavné zmeny oproti minulej sezóne

### Disciplinárne konania

- Zavedenie systému žltých a červených kariet podľa najnovších pravidiel FIH
- Automatický 1-zápasový trest za 3 žlté karty v sezóne
- Zrýchlenie disciplinárnych konaní — rozhodnutie do 72 hodín

### Registrácia hráčov

- Predĺženie prestupového okna do 15. októbra (doteraz 30. septembra)
- Zavedenie elektronickej registrácie cez portál SZPH
- Nová kategória hosťovania pre mládežníckych hráčov

### Formát súťaží

- Extraliga mužov: 7 tímov, trojkolový systém (18 zápasov)
- Extraliga žien: 4 tímy, päťkolový systém (15 zápasov)
- U18, U14, U12: turnajový formát s celoštátnym finále

> Nový formát prinesie viac zápasov a atraktívnejšiu súťaž. Veríme, že to zvýši záujem divákov aj médií. — Mgr. Andrea Kollová, predsedníčka súťažnej komisie

## Termínová listina

- Začiatok sezóny: 15. september 2026
- Zimná prestávka: 15. december 2026 – 1. marec 2027
- Koniec základnej časti: 30. máj 2027
- Play-off finále: 14.–15. jún 2027

## Kompletný dokument

Kompletný súťažný poriadok je dostupný na stiahnutie v sekcii Dokumenty na stránke szph.sk.',
  '/images/maingraphic.png',
  'oznamy', 'szph', 'published', NOW() - INTERVAL '15 days'
),

-- ═══════════════════════════════════════════════════════════
-- ČLÁNOK 6: Ženská reprezentácia
-- ═══════════════════════════════════════════════════════════
(
  'reprezentacia-zeny-eurohockey-2026',
  'Ženská reprezentácia postúpila na EuroHockey Championship — historický úspech',
  'Slovenské hokejistky zdolali Chorvátsko 3:1 v kvalifikačnom turnaji a vybojovali postup na EuroHockey Championship II. Je to najväčší úspech ženskej reprezentácie.',
  '## Historický postup

Slovenská ženská reprezentácia v pozemnom hokeji dosiahla historický úspech. Na kvalifikačnom turnaji v Záhrebe zdolala Chorvátsko 3:1 a vybojovala postup na EuroHockey Championship II, čo je najvyššia úroveň, na ktorej slovenské hokejistky kedy hrali.

## Priebeh rozhodujúceho zápasu

Zápas proti Chorvátsku bol nervózny od prvej minúty. Slovenky išli do vedenia už v 8. minúte gólom Petry Kováčovej z trestného rohu. Chorvátky vyrovnali v 23. minúte, ale ešte pred polčasom Zuzana Némethová vrátila Slovensku vedenie krásnym individuálnym priebehom.

### Štatistiky zápasu

- Držanie lopty: Slovensko 48 % – Chorvátsko 52 %
- Strely na bránku: 12 – 8
- Trestné rohy: 5 – 3
- Žlté karty: 1 – 2

V druhom polčase bola hra vyrovnaná, ale v 58. minúte spečatila výhru kapitánka Mária Horváthová strelou z ľavej strany.

> Toto je sen, na ktorom sme pracovali roky. Dievčatá nechali na ihrisku všetko a zaslúžia si obrovský rešpekt. — Ing. Katarína Blahová, trénerka ženskej reprezentácie

## Výsledky celého turnaja

- Slovensko vs Litva: 4:0
- Slovensko vs Turecko: 2:1
- Slovensko vs Chorvátsko: 3:1

## Strelkyne gólov

- Petra Kováčová: 4 góly (najlepšia strelkyňa turnaja)
- Zuzana Némethová: 3 góly
- Mária Horváthová: 2 góly

## Čo ďalej

EuroHockey Championship II sa uskutoční v júli 2027 v Belgicku. Slovenky sa stretnú s tímami ako Belgicko B, Škótsko, Taliansko a Rakúsko. Príprava na turnaj začne v januári 2027 sústredením v Bratislave.',
  '/images/pozemnehohokeja.png',
  'reprezentacia', 'both', 'published', NOW() - INTERVAL '3 days'
)

ON CONFLICT (slug) DO NOTHING;
