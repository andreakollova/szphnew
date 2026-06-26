const { createClient } = require("@supabase/supabase-js");

const c = createClient(
  "https://vcwgztguqqeaygcunynn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjd2d6dGd1cXFlYXlnY3VueW5uIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTU3NTQ2MSwiZXhwIjoyMDk1MTUxNDYxfQ.QSBEoF3DDZQX2WUK2K9SrueK6IX7i-3wM0OWNMdT9Mw"
);

const articles = [
  {
    slug: "vyrocna-konferencia-szph-2026",
    title: "Výročná konferencia SZPH 2026 \u2014 prijaté rozhodnutia a nové vedenie",
    excerpt: "Delegáti výročnej konferencie SZPH schválili nový rozpočet, plán rozvoja mládeže a zvolili nové predsedníctvo zväzu.",
    content: "## Konferencia v Bratislave\n\nDňa 15. júna 2026 sa v priestoroch Národného športového centra v Bratislave konala riadna výročná konferencia Slovenského zväzu pozemného hokeja. Zúčastnilo sa 42 delegátov zastupujúcich všetky registrované kluby.\n\n## Kľúčové rozhodnutia\n\nDelegáti jednohlasne schválili niekoľko dôležitých dokumentov a rozhodnutí, ktoré budú formovať budúcnosť pozemného hokeja na Slovensku:\n\n- Schválenie rozpočtu na rok 2026/2027 vo výške 285 000 EUR\n- Prijatie nového plánu rozvoja mládeže s dôrazom na regióny\n- Aktualizácia stanov SZPH v súlade s legislatívnymi zmenami\n- Vytvorenie novej komisie pre digitalizáciu a médiá\n\n## Nové predsedníctvo\n\n> Pozemný hokej na Slovensku má obrovský potenciál. Naším cieľom je priblížiť tento šport širšej verejnosti a vytvoriť podmienky pre rast na všetkých úrovniach. \u2014 Ing. Martin Kováč, novozvolený prezident SZPH\n\nKonferencia zvolila nové predsedníctvo zväzu na obdobie 2026\u20132030. Novým prezidentom sa stal Ing. Martin Kováč.\n\n## Plán rozvoja mládeže\n\nJedným z najdôležitejších bodov programu bol nový plán rozvoja mládežníckeho pozemného hokeja:\n\n- Zavedenie programu Hokejka do škôl pre základné školy v 5 krajoch\n- Zvýšenie počtu trénerov s UEFA B licenciou zo 14 na 25 do roku 2028\n- Organizácia letných hokejových kempov pre deti od 6 do 14 rokov\n- Spolupráca s českým a rakúskym zväzom na výmenných programoch\n\n## Financovanie\n\nRozpočet na novú sezónu počíta s príjmami z dotácií MŠVVaŠ SR, príspevkov FIH a EuroHockey. Oproti minulému roku sa rozpočet zvýšil o 12 %.\n\n### Rozdelenie rozpočtu\n\n- Mládežnícky šport: 38 %\n- Reprezentácia: 28 %\n- Ligový šport: 20 %\n- Administratíva a správa: 14 %",
    cover_image_url: "/images/bannerbg2.png",
    category: "oznamy",
    visible_on: "szph",
    status: "published",
    published_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    slug: "europsky-sachampionat-bratislava-2026",
    title: "Bratislava bude hostiť Európsky šampionát v pozemnom hokeji 2026",
    excerpt: "Slovensko získalo právo organizovať EuroHockey Championship III. Turnaj sa uskutoční v septembri za účasti 8 krajín.",
    content: "## Historický moment pre slovenský pozemný hokej\n\nSlovenský zväz pozemného hokeja s radosťou oznamuje, že Bratislava bude hostiť EuroHockey Championship III v septembri 2026.\n\n## O turnaji\n\nTurnaj sa uskutoční od 14. do 21. septembra 2026 na novovybudovanom ihrisku pri Národnom športovom centre.\n\n### Účastníci turnaja\n\n- Slovensko (hostiteľská krajina)\n- Chorvátsko\n- Litva\n- Turecko\n- Švajčiarsko\n- Portugalsko\n- Gruzínsko\n- Malta\n\n## Príprava areálu\n\n> Investícia do nového ihriska s umelým trávnikom najnovšej generácie je investíciou do budúcnosti slovenského pozemného hokeja. \u2014 Ing. Martin Kováč, prezident SZPH\n\nMesto Bratislava v spolupráci so SZPH investovalo do kompletnej rekonštrukcie areálu. Nové ihrisko spĺňa najprísnejšie štandardy FIH.\n\n## Vstupenky\n\nPredaj vstupeniek začne 1. augusta 2026:\n\n- Denná vstupenka: 8 EUR\n- Permanentka (celý turnaj): 35 EUR\n- Študenti a seniori: 50 % zľava\n- Deti do 12 rokov: vstup zdarma\n\n## Dobrovoľníci\n\nSZPH hľadá 60 dobrovoľníkov na pomoc počas turnaja. Prihlásiť sa môžete do 31. júla 2026.",
    cover_image_url: "/images/bannerbg.png",
    category: "novinky",
    visible_on: "both",
    status: "published",
    published_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    slug: "rozvoj-mladeze-dotacie-2026",
    title: "SZPH získal dotácie MŠVVaŠ SR na rozvoj mládeže \u2014 120 000 EUR pre kluby",
    excerpt: "Ministerstvo školstva pridelilo SZPH historicky najvyššiu dotáciu na rozvoj mládežníckeho pozemného hokeja.",
    content: "## Historicky najvyššia dotácia\n\nSlovenský zväz pozemného hokeja získal od Ministerstva školstva dotáciu vo výške 120 000 EUR na rozvoj mládežníckeho pozemného hokeja.\n\n## Rozdelenie financií\n\nDotácia bude rozdelená medzi registrované kluby podľa transparentného kľúča:\n\n- Počet registrovaných hráčov do 18 rokov\n- Kvalifikáciu trénerského tímu\n- Výsledky v mládežníckych súťažiach\n- Infraštruktúrne podmienky klubu\n\n### Plánované využitie\n\n- Nákup hokejovej výstroje pre mládežnícke tímy: 45 000 EUR\n- Trénerské kurzy a vzdelávanie: 25 000 EUR\n- Organizácia mládežníckych turnajov: 20 000 EUR\n- Letné hokejové kempy: 15 000 EUR\n- Cestovné na medzinárodné súťaže: 15 000 EUR\n\n## Program Hokejka do škôl\n\n> Chceme, aby každé dieťa na Slovensku dostalo príležitosť vyskúšať si pozemný hokej. \u2014 Jana Novotná, koordinátorka mládeže SZPH\n\nPilotný program sa spustí v septembri 2026 na 20 základných školách v Bratislavskom, Trnavskom a Nitrianskom kraji.\n\n## Termín čerpania\n\nKluby môžu žiadať o pridelenie financií do 31. augusta 2026.",
    cover_image_url: "/images/banner3.jpg",
    category: "novinky",
    visible_on: "szph",
    status: "published",
    published_at: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    slug: "kph-raca-obhajuje-titul",
    title: "KPH Rača vstupuje do sezóny ako obhajca titulu \u2014 posilnil káder o 3 hráčov",
    excerpt: "Bratislavský klub si pred novou sezónou posilnil mužstvo o troch nových hráčov vrátane reprezentanta.",
    content: "## Rača chce obhájiť\n\nKPH Rača Bratislava, víťaz mužskej Extraligy 2025/2026, vstupuje do novej sezóny s jasným cieľom \u2014 obhajoba majstrovského titulu.\n\n## Nové posily\n\n- Tomáš Horváth (26) \u2014 útočník, prišiel z rakúskeho HC Wien. Slovenský reprezentant s 34 gólmi v posledných dvoch sezónach.\n- Marek Bednár (22) \u2014 stredopoliar, odchovanec HOKO Zlaté Moravce. Najlepší hráč U21 minulej sezóny.\n- Daniel Štefanec (29) \u2014 brankár, prišiel z českého Bohemians Praha. 120 zápasov v českej najvyššej súťaži.\n\n## Trénerský tím\n\nNa lavičke pokračuje hlavný tréner Ing. Pavol Mikuš, ktorý klub priviedol k titulu.\n\n> Máme kvalitný a vyvážený káder. Cieľom je nielen obhájiť titul, ale aj uspieť v európskych pohároch. \u2014 Pavol Mikuš, hlavný tréner KPH Rača\n\n## Príprava na sezónu\n\nRača absolvovala prípravný kemp v Rakúsku s výsledkami:\n\n- KPH Rača vs HC Wien 3:1\n- KPH Rača vs SV Arminen 2:0\n- KPH Rača vs UHC Hamburg 1:1\n- KPH Rača vs HC Wiener Neustadt 4:2\n\n## Prvý ligový zápas\n\nSezóna odštartuje 15. septembra 2026 domácim zápasom proti HOKO Zlaté Moravce o 14:00 v Rači.",
    cover_image_url: "/images/banner4.jpg",
    category: "kluby",
    visible_on: "both",
    status: "published",
    published_at: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    slug: "novy-sutazny-poriadok-2026-2027",
    title: "Nový súťažný poriadok pre sezónu 2026/2027 \u2014 hlavné zmeny",
    excerpt: "Riadiaci zbor SZPH schválil aktualizovaný súťažný poriadok. Zmeny sa týkajú disciplinárnych konaní a organizácie turnajov.",
    content: "## Aktualizovaný poriadok\n\nRiadiaci zbor SZPH schválil nový súťažný poriadok pre sezónu 2026/2027. Dokument vstupuje do platnosti 1. septembra 2026.\n\n## Hlavné zmeny\n\n### Disciplinárne konania\n\n- Zavedenie systému žltých a červených kariet podľa najnovších pravidiel FIH\n- Automatický 1-zápasový trest za 3 žlté karty v sezóne\n- Zrýchlenie disciplinárnych konaní \u2014 rozhodnutie do 72 hodín\n\n### Registrácia hráčov\n\n- Predĺženie prestupového okna do 15. októbra\n- Zavedenie elektronickej registrácie cez portál SZPH\n- Nová kategória hosťovania pre mládežníckych hráčov\n\n### Formát súťaží\n\n- Extraliga mužov: 7 tímov, trojkolový systém (18 zápasov)\n- Extraliga žien: 4 tímy, päťkolový systém (15 zápasov)\n- U18, U14, U12: turnajový formát s celoštátnym finále\n\n> Nový formát prinesie viac zápasov a atraktívnejšiu súťaž. \u2014 Mgr. Andrea Kollová, predsedníčka súťažnej komisie\n\n## Termínová listina\n\n- Začiatok sezóny: 15. september 2026\n- Zimná prestávka: 15. december 2026 \u2013 1. marec 2027\n- Koniec základnej časti: 30. máj 2027\n- Play-off finále: 14.\u201315. jún 2027",
    cover_image_url: "/images/maingraphic.png",
    category: "oznamy",
    visible_on: "szph",
    status: "published",
    published_at: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    slug: "reprezentacia-zeny-eurohockey-2026",
    title: "Ženská reprezentácia postúpila na EuroHockey Championship \u2014 historický úspech",
    excerpt: "Slovenské hokejistky zdolali Chorvátsko 3:1 a vybojovali postup na EuroHockey Championship II.",
    content: "## Historický postup\n\nSlovenská ženská reprezentácia dosiahla historický úspech. Na kvalifikačnom turnaji v Záhrebe zdolala Chorvátsko 3:1 a vybojovala postup na EuroHockey Championship II.\n\n## Priebeh rozhodujúceho zápasu\n\nSlovenky išli do vedenia v 8. minúte gólom Petry Kováčovej z trestného rohu. Chorvátky vyrovnali v 23. minúte, ale Zuzana Némethová vrátila Slovensku vedenie krásnym individuálnym priebehom.\n\n### Štatistiky zápasu\n\n- Držanie lopty: Slovensko 48 % \u2013 Chorvátsko 52 %\n- Strely na bránku: 12 \u2013 8\n- Trestné rohy: 5 \u2013 3\n- Žlté karty: 1 \u2013 2\n\nV 58. minúte spečatila výhru kapitánka Mária Horváthová.\n\n> Toto je sen, na ktorom sme pracovali roky. Dievčatá nechali na ihrisku všetko. \u2014 Ing. Katarína Blahová, trénerka\n\n## Výsledky celého turnaja\n\n- Slovensko vs Litva: 4:0\n- Slovensko vs Turecko: 2:1\n- Slovensko vs Chorvátsko: 3:1\n\n## Strelkyne gólov\n\n- Petra Kováčová: 4 góly (najlepšia strelkyňa turnaja)\n- Zuzana Némethová: 3 góly\n- Mária Horváthová: 2 góly\n\n## Čo ďalej\n\nEuroHockey Championship II sa uskutoční v júli 2027 v Belgicku. Príprava začne v januári 2027 sústredením v Bratislave.",
    cover_image_url: "/images/pozemnehohokeja.png",
    category: "reprezentacia",
    visible_on: "both",
    status: "published",
    published_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

(async () => {
  const slugs = articles.map((a) => a.slug);
  await c.from("articles").delete().in("slug", slugs);

  const { data, error } = await c.from("articles").insert(articles).select("slug, title");
  if (error) {
    console.error("ERROR:", error.message);
    process.exit(1);
  }
  console.log("Inserted", data.length, "articles:");
  data.forEach((a) => console.log(" -", a.slug));
  process.exit(0);
})();
