import { initDb, json, leadKeyboard, sendCsv, services, tableKeyboard, telegram } from "../lib/lead-bot.js";

export async function onRequestPost({ request, env }) {
  if (env.TELEGRAM_WEBHOOK_SECRET && request.headers.get("X-Telegram-Bot-Api-Secret-Token") !== env.TELEGRAM_WEBHOOK_SECRET) return json({ error: "Unauthorized" }, 401);
  const update = await request.json(); const callback = update.callback_query;
  if (!callback || String(callback.message?.chat?.id) !== String(env.TELEGRAM_CHAT_ID)) return json({ ok: true });
  await initDb(env); const [action, value] = String(callback.data || "").split(":");
  if (action === "table") {
    await telegram(env, "answerCallbackQuery", { callback_query_id: callback.id });
    await telegram(env, "sendMessage", { chat_id: env.TELEGRAM_CHAT_ID, text: "📊 Выберите услугу для таблицы лидов:", reply_markup: tableKeyboard() });
  } else if (action === "filter") {
    const category = value === "all" ? null : services[Number(value)];
    await telegram(env, "answerCallbackQuery", { callback_query_id: callback.id, text: category || "Все услуги" });
    await sendCsv(env, category);
  } else if (["received", "contacted", "rejected"].includes(action)) {
    const now = new Date().toISOString(); await env.DB.prepare("UPDATE leads SET status = ?, updated_at = ? WHERE id = ?").bind(action, now, value).run();
    await telegram(env, "answerCallbackQuery", { callback_query_id: callback.id, text: { received: "✅ Получено", contacted: "📞 Связались", rejected: "✕ Отказ" }[action] });
    await telegram(env, "editMessageReplyMarkup", { chat_id: env.TELEGRAM_CHAT_ID, message_id: callback.message.message_id, reply_markup: leadKeyboard(value, action) });
  }
  return json({ ok: true });
}

export function onRequestGet() { return json({ ok: true, mode: "telegram-webhook" }); }
