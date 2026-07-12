import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiUrl = process.env.LEAD_BOT_API_URL;
  const secret = process.env.LEAD_API_SECRET;
  if (!apiUrl || !secret) {
    return NextResponse.json({ error: "Канал заявок ещё не настроен." }, { status: 503 });
  }

  let body: unknown;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "Некорректная заявка." }, { status: 400 }); }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${secret}`,
        "X-Forwarded-For": request.headers.get("x-forwarded-for") || "unknown"
      },
      body: JSON.stringify({ ...(body as object), source: "solvix-site" }),
      cache: "no-store"
    });
    const result = await response.json().catch(() => ({})) as { error?: string };
    return NextResponse.json(
      response.ok ? { ok: true } : { error: result.error || "Не удалось отправить заявку." },
      { status: response.status }
    );
  } catch {
    return NextResponse.json({ error: "Сервис заявок временно недоступен." }, { status: 503 });
  }
}
