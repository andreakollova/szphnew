import { NextRequest, NextResponse } from "next/server";
import { notifyArticlePublished, notifyMatchResult } from "@/lib/slack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === "article_published") {
      await notifyArticlePublished(body.data);
    } else if (type === "match_result") {
      await notifyMatchResult(body.data);
    } else {
      return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
