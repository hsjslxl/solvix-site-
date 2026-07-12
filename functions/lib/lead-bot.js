export const services = [
  "Автоматизация заявок и бизнес-процессов", "Сайты и лендинги", "Telegram-боты",
  "Интеграции с Google Sheets, CRM и API", "AI-автоматизация прикладных задач",
  "Парсеры и сбор данных", "Калькуляторы стоимости на сайт", "Личные кабинеты и мини-CRM",
  "Исправление технических проблем на сайте", "Аналитика, UTM, события и отчеты",
  "Внутренние панели и админ-системы", "Автоматизация отделов продаж, поддержки и операций",
  "Интеграции между CRM, ERP, складом, сайтом и внутренними сервисами",
  "Корпоративные Telegram, Slack и Teams-боты", "AI-ассистенты для сотрудников и базы знаний",
  "Обработка больших таблиц, отчетов и регулярных выгрузок",
  "Внутренние сервисы для менеджеров, логистов, HR и бухгалтерии",
  "API-интеграции и связующие сервисы между разными системами",
  "Аудит и оптимизация существующих процессов", "Техническая документация, регламенты и инструкции",
  "Прототипы внутренних B2B-инструментов", "Поддержка и доработка существующих решений", "Другое"
];

const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
export const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });
export const telegram = async (env, method, body) => {
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const result = await response.json(); if (!result.ok) throw new Error(result.description || "Telegram error"); return result.result;
};
export const initDb = (env) => env.DB.prepare(`CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, status TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, name TEXT NOT NULL, contact_method TEXT NOT NULL, contact TEXT NOT NULL, task_type TEXT NOT NULL, details TEXT NOT NULL, source TEXT NOT NULL, ip TEXT NOT NULL)`).run();
export const leadKeyboard = (id, status = "new") => {
  const table = [{ text: "📊 Таблица лидов", callback_data: "table:menu" }];
  if (status === "new") return { inline_keyboard: [[{ text: "✅ В полученные", callback_data: `received:${id}` }, { text: "✕ Отказ", callback_data: `rejected:${id}` }], table] };
  if (status === "received") return { inline_keyboard: [[{ text: "📞 Связались", callback_data: `contacted:${id}` }, { text: "✕ Отказ", callback_data: `rejected:${id}` }], table] };
  return { inline_keyboard: [table] };
};
export const tableKeyboard = () => {
  const buttons = [{ text: "Все услуги", callback_data: "filter:all" }, ...services.map((name, index) => ({ text: name, callback_data: `filter:${index}` }))];
  return { inline_keyboard: Array.from({ length: Math.ceil(buttons.length / 2) }, (_, index) => buttons.slice(index * 2, index * 2 + 2)) };
};
export const formatLead = (lead) => [`<b>Новая заявка #${escapeHtml(lead.id)}</b>`, "", `<b>Имя:</b> ${escapeHtml(lead.name)}`, `<b>Контакт:</b> ${escapeHtml(lead.contact)}`, `<b>Услуга:</b> ${escapeHtml(lead.taskType)}`, "", escapeHtml(lead.details), "", `<i>${escapeHtml(lead.source)}</i>`].join("\n");
export const sendCsv = async (env, category = null) => {
  const query = category ? env.DB.prepare("SELECT * FROM leads WHERE task_type = ? ORDER BY created_at DESC").bind(category) : env.DB.prepare("SELECT * FROM leads ORDER BY created_at DESC");
  const { results } = await query.all();
  const fields = ["id", "status", "created_at", "name", "contact_method", "contact", "task_type", "details", "source"];
  const quote = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  const csv = "\uFEFF" + [fields.join(","), ...results.map((lead) => fields.map((field) => quote(lead[field])).join(","))].join("\n");
  const form = new FormData(); form.set("chat_id", env.TELEGRAM_CHAT_ID); form.set("caption", `${category || "Все услуги"} · ${results.length} лидов`); form.set("document", new Blob([csv], { type: "text/csv;charset=utf-8" }), `solvix-leads-${category ? services.indexOf(category) + 1 : "all"}.csv`);
  return fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendDocument`, { method: "POST", body: form });
};
