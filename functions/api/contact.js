import { formatLead, initDb, json, leadKeyboard, services, telegram } from "../lib/lead-bot.js";

export async function onRequestPost(context) {
  const { env, request } = context;
  if (!env.DB || !env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return json({ error: "Канал заявок ещё не настроен." }, 503);
  let body; try { body = await request.json(); } catch { return json({ error: "Некорректная заявка." }, 400); }
  const text = (key, max) => String(body?.[key] ?? "").trim().slice(0, max);
  const lead = { id: crypto.randomUUID().slice(0, 8), name: text("name", 80), contactMethod: text("contactMethod", 20), contact: text("contact", 120), taskType: text("taskType", 100), details: text("details", 3000), source: "solvix-site" };
  if (text("website", 200)) return json({ error: "Заявка отклонена." }, 400);
  if (!lead.name || !lead.contact || !lead.details || !services.includes(lead.taskType)) return json({ error: "Проверьте обязательные поля заявки." }, 400);
  const startedAt = Number(body?.startedAt || 0); if (startedAt && Date.now() - startedAt < 1500) return json({ error: "Форма отправлена слишком быстро." }, 400);
  const ip = request.headers.get("CF-Connecting-IP") || "unknown"; const now = new Date().toISOString();
  try {
    await initDb(env);
    const since = new Date(Date.now() - 60_000).toISOString();
    const rate = await env.DB.prepare("SELECT COUNT(*) count FROM leads WHERE ip = ? AND created_at > ?").bind(ip, since).first();
    if (Number(rate?.count || 0) >= 5) return json({ error: "Слишком много заявок. Попробуйте через минуту." }, 429);
    await env.DB.prepare("INSERT INTO leads VALUES (?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(lead.id, now, now, lead.name, lead.contactMethod, lead.contact, lead.taskType, lead.details, lead.source, ip).run();
    await telegram(env, "sendMessage", { chat_id: env.TELEGRAM_CHAT_ID, text: formatLead(lead), parse_mode: "HTML", reply_markup: leadKeyboard(lead.id) });
    return json({ ok: true, id: lead.id }, 201);
  } catch (error) { console.error(error); return json({ error: "Не удалось доставить заявку. Попробуйте ещё раз." }, 502); }
}

export function onRequestGet() { return json({ ok: true, submissionsEnabled: true }); }
