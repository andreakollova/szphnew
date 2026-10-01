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

export function notifyArticlePublished(article: {
  title: string;
  slug: string;
  category: string;
  visible_on: string;
}) {
  const categoryLabels: Record<string, string> = {
    novinky: "Novinky",
    reprezentacia: "Reprezentacia",
    kluby: "Kluby",
    oznamy: "Oznamy",
  };

  const siteLabels: Record<string, string> = {
    szph: "szph.sk",
    fieldhockey: "fieldhockey.sk",
    both: "Oba weby",
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
          { type: "mrkdwn", text: `*Web:*\n${siteLabels[article.visible_on] ?? article.visible_on}` },
          { type: "mrkdwn", text: `*Link:*\n<https://szph.sk/novinky/${article.slug}|Zobrazit>` },
        ],
      },
    ],
    `Novy clanok: ${article.title}`,
  );
}

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
        ? [
            {
              type: "context",
              elements: [{ type: "mrkdwn", text: `Sutaz: ${match.competition}` }],
            },
          ]
        : []),
    ],
    `Vysledok: ${match.home_team} ${match.home_score}:${match.away_score} ${match.away_team}`,
  );
}

export function notifyMissingResults(
  matches: Array<{
    home_team: string;
    away_team: string;
    date: string;
    competition?: string;
  }>,
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
        text: {
          type: "mrkdwn",
          text: `Nasledujuce zapasy nemaju vyplneny vysledok:\n${lines.join("\n")}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `<https://szph.sk/admin/zapasy|Vyplnit vysledky v admine>`,
        },
      },
    ],
    `${matches.length} zapas(ov) bez vysledku`,
  );
}
