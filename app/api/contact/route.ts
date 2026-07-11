import { NextResponse } from "next/server";

type ContactMethod = "telegram" | "email" | "phone";

type LeadPayload = {
  name?: string;
  contactMethod?: ContactMethod;
  contact?: string;
  taskType?: string;
  details?: string;
  consent?: string;
  website?: string;
  startedAt?: string | number;
};

function formatLead(data: LeadPayload) {
  const contactLabels: Record<ContactMethod, string> = {
    telegram: "Telegram",
    email: "Email",
    phone: "Телефон"
  };

  return [
    "Новая заявка Solvix",
    `Имя: ${data.name || "-"}`,
    `Способ связи: ${data.contactMethod ? contactLabels[data.contactMethod] : "Не указан"}`,
    `Контакт: ${data.contact || "-"}`,
    `Тип задачи: ${data.taskType || "-"}`,
    `Описание: ${data.details || "-"}`
  ].join("\n");
}

function isValid(data: LeadPayload) {
  const methods: ContactMethod[] = ["telegram", "email", "phone"];
  return (
    typeof data.name === "string" &&
    data.name.trim().length >= 2 &&
    data.name.length <= 80 &&
    Boolean(data.contactMethod && methods.includes(data.contactMethod)) &&
    typeof data.contact === "string" &&
    data.contact.trim().length >= 3 &&
    data.contact.length <= 120 &&
    typeof data.taskType === "string" &&
    data.taskType.trim().length >= 2 &&
    data.taskType.length <= 100 &&
    typeof data.details === "string" &&
    data.details.trim().length >= 5 &&
    data.details.length <= 3000 &&
    data.consent === "yes"
  );
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("Telegram is not configured");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });

  if (!response.ok) throw new Error(`Telegram rejected the message: ${response.status}`);
}

export async function POST(request: Request) {
  let data: LeadPayload;

  try {
    data = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Некорректные данные заявки" }, { status: 400 });
  }

  if (data.website) return NextResponse.json({ ok: true });

  const startedAt = Number(data.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1500) {
    return NextResponse.json(
      { error: "Не удалось проверить форму. Обновите страницу и попробуйте снова." },
      { status: 400 }
    );
  }

  if (!isValid(data)) {
    return NextResponse.json(
      { error: "Проверьте заполнение полей и согласие с политикой." },
      { status: 400 }
    );
  }

  try {
    await sendTelegram(formatLead(data));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Не удалось доставить заявку. Попробуйте ещё раз немного позже." },
      { status: 502 }
    );
  }
}
