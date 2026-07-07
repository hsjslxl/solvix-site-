function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

function formatLead(data) {
  return [
    "Новая заявка Solvix",
    `Имя: ${data.name || "-"}`,
    `Телефон: ${data.phone || "-"}`,
    `Контакт: ${data.contact || "-"}`,
    `Тип задачи: ${data.taskType || "-"}`,
    `Описание: ${data.details || "-"}`
  ].join("\n");
}

async function sendSms(env, text) {
  if (!env.SMS_RU_API_ID || !env.LEAD_SMS_TO) return;

  const params = new URLSearchParams({
    api_id: env.SMS_RU_API_ID,
    to: env.LEAD_SMS_TO,
    msg: text.slice(0, 300),
    json: "1"
  });

  await fetch(`https://sms.ru/sms/send?${params.toString()}`);
}

async function sendTelegram(env, text) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;

  await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text })
  });
}

export async function onRequestPost({ request, env }) {
  let data;

  try {
    data = await request.json();
  } catch {
    return json({ error: "Некорректные данные заявки" }, 400);
  }

  if (!data.name || !data.phone || !data.contact || !data.taskType || !data.details) {
    return json({ error: "Заполните все поля" }, 400);
  }

  const text = formatLead(data);
  const results = await Promise.allSettled([sendSms(env, text), sendTelegram(env, text)]);
  const failed = results.some((result) => result.status === "rejected");

  return json({
    ok: true,
    warning: failed ? "Часть уведомлений не отправилась" : undefined
  });
}

export function onRequestGet() {
  return json({ ok: true });
}
