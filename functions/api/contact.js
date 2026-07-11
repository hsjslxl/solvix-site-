function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

function formatLead(data) {
  const contactLabels = {
    telegram: "Telegram",
    email: "Email",
    phone: "Телефон"
  };

  return [
    "Новая заявка Solvix",
    `Имя: ${data.name || "-"}`,
    `Способ связи: ${contactLabels[data.contactMethod] || "Не указан"}`,
    `Контакт: ${data.contact || "-"}`,
    `Тип задачи: ${data.taskType || "-"}`,
    `Описание: ${data.details || "-"}`
  ].join("\n");
}

async function sendTelegram(env, text) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    throw new Error("Telegram is not configured");
  }

  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text })
  });

  if (!response.ok) {
    throw new Error(`Telegram rejected the message: ${response.status}`);
  }
}

const attempts = new Map();

function isRateLimited(request) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const current = attempts.get(ip);

  if (!current || now - current.startedAt > windowMs) {
    attempts.set(ip, { startedAt: now, count: 1 });
    return false;
  }

  current.count += 1;
  return current.count > 5;
}

function isValid(data) {
  const methods = ["telegram", "email", "phone"];
  return (
    typeof data.name === "string" && data.name.trim().length >= 2 && data.name.length <= 80 &&
    methods.includes(data.contactMethod) &&
    typeof data.contact === "string" && data.contact.trim().length >= 3 && data.contact.length <= 120 &&
    typeof data.taskType === "string" && data.taskType.trim().length >= 2 && data.taskType.length <= 100 &&
    typeof data.details === "string" && data.details.trim().length >= 5 && data.details.length <= 3000 &&
    data.consent === "yes"
  );
}

export async function onRequestPost({ request, env }) {
  if (isRateLimited(request)) {
    return json({ error: "Слишком много заявок. Попробуйте ещё раз через 10 минут." }, 429);
  }

  let data;

  try {
    data = await request.json();
  } catch {
    return json({ error: "Некорректные данные заявки" }, 400);
  }

  if (data.website) {
    return json({ ok: true });
  }

  const startedAt = Number(data.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1500) {
    return json({ error: "Не удалось проверить форму. Обновите страницу и попробуйте снова." }, 400);
  }

  if (!isValid(data)) {
    return json({ error: "Проверьте заполнение полей и согласие с политикой." }, 400);
  }

  const text = formatLead(data);
  try {
    await sendTelegram(env, text);
    return json({ ok: true });
  } catch {
    return json(
      { error: "Не удалось доставить заявку. Попробуйте ещё раз немного позже." },
      502
    );
  }
}

export function onRequestGet() {
  return json({ ok: true });
}
