import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doping v športe",
  description: "Antidopingové informácie, pravidlá a zdroje pre športovcov SZPH.",
};

const linkStyle = { color: "#1d4ed8" };
const h2Style = { fontSize: "22px" };
const h3Style = { fontSize: "17px" };
const pStyle = { fontSize: "15px", lineHeight: 1.8 };
const cardStyle = {
  background: "#ffffff",
  border: "1px solid rgba(1,45,116,0.08)",
  borderRadius: "16px",
  padding: "20px 24px",
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-bold text-[#051937] mt-12 mb-4"
      style={h2Style}
    >
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-semibold text-[#334155] mt-6 mb-2" style={h3Style}>
      {children}
    </h3>
  );
}

function Para({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[#334155] mb-4 ${className ?? ""}`} style={pStyle}>
      {children}
    </p>
  );
}

function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      className="flex items-center justify-between gap-4 rounded-2xl px-6 py-4 transition-shadow hover:shadow-md group mb-2"
      style={{ ...cardStyle, textDecoration: "none", padding: "16px 24px" }}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="font-semibold group-hover:underline" style={{ color: "#1d4ed8", fontSize: "15px" }}>
        {children}
      </span>
      <span
        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
        style={{ background: "#1d4ed8", fontSize: "14px" }}
      >
        ↓
      </span>
    </a>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="text-[#334155] mb-4 pl-2" style={pStyle}>
      {items.map((item) => (
        <li key={item} className="flex gap-2 mb-1">
          <span className="shrink-0 mt-1" style={{ color: "#1d4ed8" }}>–</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const violations = [
  "prítomnosť zakázanej látky alebo jej metabolitov alebo markerov vo vzorke športovca,",
  "použitie alebo pokus o použitie zakázanej látky alebo zakázanej metódy športovcom,",
  "vyhýbanie sa, odmietnutie alebo nepodrobenie sa odberu vzorky športovcom,",
  "neposkytnutie informácií o mieste pobytu športovca,",
  "falšovanie alebo pokus o falšovanie počas ktorejkoľvek časti dopingovej kontroly športovcom alebo inou osobou,",
  "držba zakázanej látky alebo zakázanej metódy športovcom alebo sprievodným personálom športovca,",
  "obchodovanie alebo pokus o obchodovanie so zakázanou látkou alebo metódou športovcom alebo inou osobou,",
  "podanie alebo pokus o podanie zakázanej látky alebo metódy,",
  "spoluúčasť alebo pokus o spoluúčasť športovcom alebo inou osobou,",
  "zakázané združovanie športovcom alebo inou osobou,",
  "odrádzanie od oznámenia porušenia úradom zo strany športovca alebo inej osoby.",
];

const tueCriteria = [
  "Športovec by utrpel výrazné poškodenie zdravia, ak by mu nebola podaná zakázaná látka alebo metóda na liečbu akútneho alebo chronického zdravotného stavu.",
  "Terapeutické použitie zakázanej látky alebo metódy by nemohlo zlepšiť výkon športovca nad rámec úrovne, ktorú by mal, keby bol zdravý.",
  "Neexistuje žiadna rozumná terapeutická alternatíva k použitiu zakázanej látky alebo metódy.",
  "Potreba použiť zakázanú látku alebo metódu nie je dôsledkom predchádzajúceho dopingu.",
];

const sportsmanRights = [
  "Poznať a dodržiavať antidopingové pravidlá platné pre šport, ktorý vykonáva.",
  "Byť k dispozícii na testovanie kedykoľvek a kdekoľvek.",
  "Informovať príslušné antidopingové orgány o svojom mieste pobytu.",
  "Pred podaním liekov alebo doplnkov výživy sa uistiť, že neobsahujú zakázané látky.",
  "Ak je to potrebné z dôvodu zdravotného stavu, požiadať o terapeutickú výnimku pred začatím liečby.",
  "Spolupracovať s antidopingovými organizáciami pri vyšetrovaní porušenia antidopingových pravidiel.",
  "Ohlásiť podozrenie na porušenie antidopingových pravidiel príslušným orgánom.",
];

export default function DopingPage() {
  return (
    <article style={{ background: "#f8f9fa" }} className="pb-20">
      {/* Hero */}
      <div className="py-16 px-6" style={{ background: "#051937" }}>
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-bold uppercase text-white/40 mb-4 block"
            style={{ fontSize: "10px", letterSpacing: "0.14em" }}
          >
            O SZPH
          </span>
          <h1
            className="font-bold text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Doping v športe
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 pt-12">

        {/* Čo je doping */}
        <SectionHeading>Čo je doping?</SectionHeading>
        <Para>
          Doping je definovaný ako porušenie jedného alebo viacerých antidopingových pravidiel
          uvedených v článkoch Kódexu 2.1 až 2.11.
        </Para>
        <Para>
          Podľa Kódexu je povinnosťou športovca ovládať antidopingové pravidlá a vedieť, čo znamená
          ich porušenie. Porušenie antidopingových pravidiel neznamená len „pozitívny test", ktorý
          Kódex definuje ako nepriaznivý analytický nález.
        </Para>
        <Para className="mb-2">Medzi porušenia antidopingových pravidiel patria:</Para>
        <BulletList items={violations} />

        {/* Svetový antidopingový kódex */}
        <SectionHeading>Svetový antidopingový kódex</SectionHeading>
        <Para>
          Svetový antidopingový kódex (Kódex) je základným a univerzálnym dokumentom, na ktorom je
          postavený Svetový antidopingový program. Kódex bol prvýkrát prijatý v roku 2003 a nadobudol
          platnosť 1. januára 2004. Posledná revízia nadobudla platnosť 1. januára 2021.
        </Para>
        <DocLink href="#">Svetový antidopingový kódex 2021 (svk verzia)</DocLink>
        <DocLink href="#">World antidoping code 2021 (eng verzia)</DocLink>

        {/* Zoznam zakázaných látok */}
        <SectionHeading>Zoznam zakázaných látok</SectionHeading>
        <Para>
          Zoznam zakázaných látok a metód (Zoznam) je medzinárodným štandardom v rámci Kódexu, ktorý
          každoročne aktualizuje Svetová antidopingová agentúra (WADA). Aktuálny Zoznam nadobúda
          platnosť vždy 1. januára príslušného roka.
        </Para>
        <DocLink href="#">Zoznam zakázaných látok a metód 2026 (svk verzia)</DocLink>
        <DocLink href="#">Prohibited list 2026 (eng verzia)</DocLink>
        <DocLink href="#">Súhrn zmien v Zozname zakázaných látok a metód 2026</DocLink>
        <DocLink href="#">Monitorovací program 2026 (eng verzia)</DocLink>

        <div className="mt-6 rounded-2xl px-6 py-5" style={cardStyle}>
          <Para className="mb-1">
            Na overenie, či konkrétny liek obsahuje zakázanú látku, slúži databáza{" "}
            <a href="https://www.zakazanelatky.sk" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              www.zakazanelatky.sk
            </a>
            . Databáza je dostupná aj ako mobilná aplikácia.
          </Para>
          <Para className="mb-0">
            Zoznam liekov povolených pre športovcov nájdete v dokumente:{" "}
            <a href="#" style={linkStyle} className="font-semibold">
              Povolené lieky
            </a>
            .
          </Para>
        </div>

        {/* TUE */}
        <SectionHeading>Terapeutická výnimka (TUE)</SectionHeading>
        <Para>
          Ak športovec trpí zdravotným stavom, ktorý si vyžaduje liečbu zakázanou látkou alebo
          metódou, môže požiadať o terapeutickú výnimku (TUE). TUE môže byť udelená, ak sú splnené
          všetky štyri nasledujúce kritériá:
        </Para>
        <BulletList items={tueCriteria} />
        <Para>
          Viac informácií o postupe pri žiadaní TUE nájdete na stránke{" "}
          <a href="https://antidoping.sk/tue/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            antidoping.sk/tue/
          </a>
          .
        </Para>

        {/* Výživové doplnky */}
        <SectionHeading>Výživové doplnky</SectionHeading>
        <Para>
          Výživové doplnky predstavujú pre športovcov zvýšené riziko neúmyselného dopingu. Na rozdiel
          od liekov neprechádzajú prísnou kontrolou kvality a môžu obsahovať zakázané látky, ktoré
          nie sú uvedené na etikete. Zodpovednosť za každú látku nachádzajúcu sa v tele športovca
          nesie vždy športovec sám.
        </Para>
        <Para>
          Pred použitím akéhokoľvek doplnku výživy sa informujte o jeho zložení a rizikách. Bližšie
          informácie nájdete v dokumente:{" "}
          <a href="#" style={linkStyle} className="font-semibold">
            Doplnky výživy v športe
          </a>
          .
        </Para>

        {/* Práva a povinnosti */}
        <SectionHeading>Práva a povinnosti športovca</SectionHeading>
        <Para>Každý športovec má voči antidopingovým pravidlám nasledujúce povinnosti:</Para>
        <BulletList items={sportsmanRights} />

        {/* Testovanie */}
        <SectionHeading>Testovanie, odber vzoriek a ich analýza</SectionHeading>
        <Para>
          Testovanie športovcov vykonáva na Slovensku Slovenská antidopingová agentúra (SADA). SADA
          má právo testovať športovcov kedykoľvek a kdekoľvek – počas súťaže aj mimo nej.
          Neoznámené testovanie mimo súťaže je kľúčovým nástrojom boja proti dopingu.
        </Para>
        <Para>
          Odber vzoriek moču a krvi prebieha podľa medzinárodných štandardov WADA. Odobraté vzorky
          sa analyzujú v akreditovaných antidopingových laboratóriách. Športovec má právo byť
          prítomný pri odbere, zvoliť si svedka a napadnúť výsledky analýzy.
        </Para>
        <Para>
          Podrobnejšie informácie o priebehu dopingovej kontroly nájdete na{" "}
          <a href="https://antidoping.sk/dopingova-kontrola/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            antidoping.sk/dopingova-kontrola/
          </a>
          .
        </Para>

        {/* Návrat po ukončení */}
        <SectionHeading>Návrat po ukončení aktívnej športovej činnosti</SectionHeading>
        <Para>
          Športovec, ktorý ukončil aktívnu kariéru a chce sa vrátiť k súťaženiu, musí pred prvým
          štartom spĺňať požiadavky na dostupnosť pre testovanie. Antidopingová organizácia musí byť
          o plánovanom návrate informovaná s dostatočným predstihom, aby mohlo prebehnúť testovanie
          mimo súťaže. Presné podmienky návratu sú stanovené v Kódexe a príslušných predpisoch
          národných a medzinárodných organizácií.
        </Para>

        {/* ADAMS */}
        <SectionHeading>Informácie o mieste pobytu – ADAMS</SectionHeading>
        <Para>
          Systém ADAMS (Anti-Doping Administration and Management System) je webová databáza na
          správu a sledovanie informácií v oblasti antidopingu. Prostredníctvom ADAMS môžu športovci
          zo zoznamu testovaného fondu poskytovať informácie o svojom mieste pobytu, ktoré
          antidopingovým organizáciám umožňujú plánovať neoznámené testovanie mimo súťaže.
        </Para>
        <Para>
          Poskytovanie informácií o mieste pobytu je povinnosťou športovcov zaradených do
          registrovaného zoznamu testovaného fondu. Neposkytnutie alebo opakovane nepresné informácie
          môžu byť kvalifikované ako porušenie antidopingových pravidiel. Športovci sú povinní
          aktualizovať svoje informácie vždy, keď dôjde k zmene ich pobytu alebo plánov.
        </Para>
        <Para>
          ADAMS tiež umožňuje spracovanie žiadostí o TUE, správu biologického pasu športovca a
          ďalšie administratívne úkony súvisiace s antidopingovým programom.
        </Para>

        {/* Vzdelávanie */}
        <SectionHeading>Vzdelávanie</SectionHeading>
        <Para>
          SADA v oblasti vzdelávania ponúka športovcom, trénerom a ďalším členom športovej komunity
          rôzne vzdelávacie nástroje a materiály:
        </Para>
        <BulletList
          items={[
            "e-learningových kurzov na platforme ADEL (Anti-Doping e-Learning)",
            "podcastov s odborníkmi z oblasti antidopingu a športovej medicíny",
            "vzdelávacích videí zameraných na rôzne aspekty antidopingových pravidiel",
            "odborných článkov a publikácií dostupných na webovej stránke SADA",
          ]}
        />
        <Para>Vzdelávacie brožúry pre špecifické cieľové skupiny:</Para>
        <DocLink href="#">Príručka pre mládež</DocLink>
        <DocLink href="#">Príručka pre rodičov</DocLink>
        <Para className="mt-4">
          Všetky vzdelávacie materiály a aktuálne informácie nájdete na{" "}
          <a href="https://www.antidoping.sk/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            www.antidoping.sk
          </a>
          .
        </Para>

        {/* Integrita športu */}
        <SectionHeading>Integrita športu</SectionHeading>
        <Para>
          Integrita športu je základným predpokladom dôveryhodnosti a hodnôt, ktoré šport
          reprezentuje. Ohrozenie integrity športu predstavuje akékoľvek konanie, ktoré narúša
          čestné a spravodlivé súťaženie.
        </Para>
        <Para>Medzi formy porušenia integrity športu patria najmä:</Para>
        <BulletList
          items={[
            "ovplyvňovanie výsledkov zápasov a súťaží (match-fixing)",
            "neoprávnené stávkovanie na vlastné zápasy",
            "korupcia a úplatkárstvo vo vzťahu k súťažiam",
            "zneužitie dôverných informácií na stávkovanie",
            "nátlak na iných športovcov, trénerov alebo funkcionárov",
          ]}
        />
        <Para>
          Ak ste svedkom alebo obeťou porušenia integrity športu, môžete to nahlásiť prostredníctvom
          kontaktov Slovenská antidopingová agentúra:
        </Para>
        <div className="rounded-2xl px-6 py-5 mt-2" style={cardStyle}>
          <SubHeading>Kontakt – Integrita športu (SADA)</SubHeading>
          <Para className="mb-1">
            <span className="font-semibold">Telefón:</span>{" "}
            <a href="tel:+421905381486" style={linkStyle}>
              0905 381 486
            </a>
          </Para>
          <Para className="mb-0">
            <span className="font-semibold">E-mail:</span>{" "}
            <a href="mailto:integrita@antidoping.sk" style={linkStyle}>
              integrita@antidoping.sk
            </a>
          </Para>
        </div>
      </div>
    </article>
  );
}
