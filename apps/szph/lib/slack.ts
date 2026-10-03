const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

interface SlackBlock {
  type: string;
  text?: { type: string; text: string; emoji?: boolean };
  elements?: Array<{ type: string; text: string; emoji?: boolean }>;
  fields?: Array<{ type: string; text: string }>;
}

export async function sendSlackMessage(blocks: SlackBlock[], text: string) {
  if (!SLACK_WEBHOOK_URL) {
    console.warn("SLACK_WEBHOOK_URL not set, skipping notification");
    return;
  }

  await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, blocks }),
  });
}

// ── Formulár z webu ──
export function notifyFormSubmission(form: {
  type: string;
  name: string;
  email: string;
  message?: string;
  page?: string;
  extra?: Record<string, string>;
}) {
  const typeLabels: Record<string, string> = {
    hrac: "Chcem sa stat hracom",
    trener: "Chcem sa stat trenerom",
    rozhodca: "Chcem sa stat rozhodcom",
    klub: "Zalozenie klubu",
    kontakt: "Kontaktny formular",
    akademia: "Navrh na cvicenie",
    podcast: "Podcast navrh",
  };

  const pageLinks: Record<string, string> = {
    hrac: "/zacni-hrat/hrac",
    trener: "/zacni-hrat/trener",
    rozhodca: "/zacni-hrat/rozhodca",
    klub: "/pre-kluby/zalozenie",
    kontakt: "/kontakt",
    akademia: "/projekty/hokejova-akademia",
    podcast: "/podcast",
  };

  const pageUrl = form.page || pageLinks[form.type] || "";
  const fullUrl = pageUrl ? `https://szphnew-fieldhockey.vercel.app${pageUrl}` : "";

  const fields: Array<{ type: string; text: string }> = [
    { type: "mrkdwn", text: `*Meno:*\n${form.name}` },
    { type: "mrkdwn", text: `*E-mail:*\n${form.email}` },
  ];

  if (form.extra) {
    for (const [key, value] of Object.entries(form.extra)) {
      if (value) fields.push({ type: "mrkdwn", text: `*${key}:*\n${value}` });
    }
  }

  const blocks: SlackBlock[] = [
    {
      type: "header",
      text: { type: "plain_text", text: `Novy formular: ${typeLabels[form.type] ?? form.type}`, emoji: true },
    },
    {
      type: "context",
      elements: [{ type: "mrkdwn", text: fullUrl ? `Stranka: <${fullUrl}|${typeLabels[form.type] ?? form.type}>` : `Stranka: ${form.type}` }],
    },
    { type: "section", fields },
  ];

  if (form.message) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*Sprava:*\n${form.message}` },
    });
  }

  return sendSlackMessage(blocks, `Formular: ${typeLabels[form.type] ?? form.type} od ${form.name}`);
}

// ── Nový článok ──
export function notifyArticlePublished(article: {
  title: string;
  slug: string;
  category: string;
  visible_on?: string;
}) {
  const categoryLabels: Record<string, string> = {
    novinky: "Novinky",
    reprezentacia: "Reprezentacia",
    kluby: "Kluby",
    oznamy: "Oznamy",
  };

  return sendSlackMessage(
    [
      {
        type: "header",
        text: { type: "plain_text", text: "Novy clanok publikovany", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Nadpis:*\n${article.title}` },
          { type: "mrkdwn", text: `*Kategoria:*\n${categoryLabels[article.category] ?? article.category}` },
          { type: "mrkdwn", text: `*Link:*\n<https://szph.sk/novinky/${article.slug}|Zobrazit>` },
        ],
      },
    ],
    `Novy clanok: ${article.title}`,
  );
}

// ── Výsledok zápasu ──
export function notifyMatchResult(match: {
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
  competition?: string;
}) {
  return sendSlackMessage(
    [
      {
        type: "header",
        text: { type: "plain_text", text: "Vysledok zapasu vyplneny", emoji: true },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${match.home_team}* ${match.home_score} : ${match.away_score} *${match.away_team}*`,
        },
      },
      ...(match.competition
        ? [{ type: "context", elements: [{ type: "mrkdwn", text: `Sutaz: ${match.competition}` }] }]
        : []),
    ],
    `Vysledok: ${match.home_team} ${match.home_score}:${match.away_score} ${match.away_team}`,
  );
}

// ── Všetky výsledky týždňa vyplnené ──
export function notifyWeeklyResultsComplete(count: number) {
  return sendSlackMessage(
    [
      {
        type: "header",
        text: { type: "plain_text", text: "Vsetky vysledky tyzdna vyplnene", emoji: true },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `Tento tyzden bolo vyplnenych *${count}* vysledkov zapasov.` },
      },
    ],
    `Vsetky vysledky tyzdna vyplnene (${count} zapasov)`,
  );
}

// ── Chýbajúce výsledky ──
export function notifyMissingResults(
  matches: Array<{ home_team: string; away_team: string; date: string; competition?: string }>,
) {
  if (matches.length === 0) return;

  const lines = matches.map(
    (m) => `- ${m.home_team} vs ${m.away_team} (${m.date}${m.competition ? `, ${m.competition}` : ""})`,
  );

  return sendSlackMessage(
    [
      {
        type: "header",
        text: { type: "plain_text", text: "Chybajuce vysledky zapasov", emoji: true },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `Nasledujuce zapasy nemaju vyplneny vysledok:\n${lines.join("\n")}` },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `<https://szph.sk/admin/zapasy|Vyplnit vysledky v admine>` },
      },
    ],
    `${matches.length} zapas(ov) bez vysledku`,
  );
}

// ── Nový partner ──
export function notifyNewPartner(partner: { name: string; tier?: string }) {
  return sendSlackMessage(
    [
      {
        type: "header",
        text: { type: "plain_text", text: "Novy partner pridany", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Nazov:*\n${partner.name}` },
          ...(partner.tier ? [{ type: "mrkdwn", text: `*Uroven:*\n${partner.tier}` }] : []),
        ],
      },
    ],
    `Novy partner: ${partner.name}`,
  );
}

// ── Nové cvičenie ──
export function notifyNewExercise(exercise: { title: string; category?: string; slug?: string }) {
  return sendSlackMessage(
    [
      {
        type: "header",
        text: { type: "plain_text", text: "Nove cvicenie pridane", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Nazov:*\n${exercise.title}` },
          ...(exercise.category ? [{ type: "mrkdwn", text: `*Kategoria:*\n${exercise.category}` }] : []),
          ...(exercise.slug ? [{ type: "mrkdwn", text: `*Link:*\n<https://szph.sk/vzdelavanie/cvicenia/${exercise.slug}|Zobrazit>` }] : []),
        ],
      },
    ],
    `Nove cvicenie: ${exercise.title}`,
  );
}

// ── Newsletter registrácia ──
export function notifyNewsletterSignup(email: string) {
  return sendSlackMessage(
    [
      {
        type: "header",
        text: { type: "plain_text", text: "Novy odberatel newsletteru", emoji: true },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*E-mail:*\n${email}` },
      },
    ],
    `Newsletter: ${email}`,
  );
}

// ── Nový spolupracovník ──
export function notifyNewCollaborator(collaborator: { name: string; role?: string; email?: string }) {
  return sendSlackMessage(
    [
      {
        type: "header",
        text: { type: "plain_text", text: "Novy spolupracovnik zaregistrovany", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Meno:*\n${collaborator.name}` },
          ...(collaborator.role ? [{ type: "mrkdwn", text: `*Rola:*\n${collaborator.role}` }] : []),
          ...(collaborator.email ? [{ type: "mrkdwn", text: `*E-mail:*\n${collaborator.email}` }] : []),
        ],
      },
    ],
    `Novy spolupracovnik: ${collaborator.name}`,
  );
}

// ── Nový projekt ──
export function notifyNewProject(project: { name: string }) {
  return sendSlackMessage(
    [
      {
        type: "header",
        text: { type: "plain_text", text: "Novy projekt pridany", emoji: true },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Nazov:*\n${project.name}` },
      },
    ],
    `Novy projekt: ${project.name}`,
  );
}
