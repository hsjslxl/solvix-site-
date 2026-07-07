import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  contact?: string;
  taskType?: string;
  details?: string;
};

function formatLead(data: LeadPayload) {
  return [
    "Новая заявка Solvix",
    `Имя: ${data.name || "-"}`,
    `Телефон: ${data.phone || "-"}`,
    `Контакт: ${data.contact || "-"}`,
    `Тип задачи: ${data.taskType || "-"}`,
    `Описание: ${data.details || "-"}`
  ].join("\n");
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

async function sendSms(text: string) {
  const apiId = process.env.SMS_RU_API_ID;
  const recipient = process.env.LEAD_SMS_TO;
  if (!apiId || !recipient) return;

  const params = new URLSearchParams({
    api_id: apiId,
    to: recipient,
    msg: text.slice(0, 300),
    json: "1"
  });

  await fetch(`https://sms.ru/sms/send?${params.toString()}`);
}

export async function POST(request: Request) {
  let data: LeadPayload;

  try {
    data = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Некорректные данные заявки" }, { status: 400 });
  }

  if (!data.name || !data.phone || !data.contact || !data.taskType || !data.details) {
    return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
  }

  const text = formatLead(data);
  const results = await Promise.allSettled([sendTelegram(text), sendSms(text)]);
  const failed = results.filter((result) => result.status === "rejected");

  console.log(text);

  return NextResponse.json({
    ok: true,
    email: process.env.LEAD_RECIPIENT_EMAIL || undefined,
    warning: failed.length ? "Часть уведомлений не отправилась" : undefined
  });
}
