"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const taskOptions = [
  "Лендинг",
  "Сайт-визитка",
  "Каталог товаров",
  "Telegram Lead Bot",
  "Бот записи",
  "FAQ Bot",
  "AI FAQ Bot",
  "AI Chat Assistant",
  "AI Knowledge Base",
  "CRM Lite",
  "Sales Dashboard",
  "Панель администратора",
  "Автоматизация заявок",
  "Email Automation",
  "Автоматизация документов",
  "Онлайн-запись",
  "Price Parser",
  "Парсер товаров",
  "Data Dashboard",
  "Интеграция OpenAI",
  "Другое"
];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [taskQuery, setTaskQuery] = useState("");
  const [isTaskListOpen, setIsTaskListOpen] = useState(false);

  const filteredTaskOptions = taskOptions.filter((option) =>
    option.toLowerCase().includes(taskQuery.trim().toLowerCase())
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) throw new Error(result?.error || "Request failed");
      form.reset();
      setTaskQuery("");
      setIsTaskListOpen(false);
      setStatus("success");
      setMessage("Заявка отправлена. Мы свяжемся с вами по указанному контакту.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message !== "Request failed"
          ? error.message
          : "Не удалось отправить заявку. Напишите в Telegram или позвоните напрямую."
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label>
          Имя
          <input name="name" required placeholder="Как к вам обращаться" />
        </label>
        <label>
          Телефон
          <input name="phone" required placeholder="+7 ..." />
        </label>
      </div>
      <label>
        Telegram или email
        <input name="contact" required placeholder="@username или email" />
      </label>
      <label>
        Тип задачи
        <div className="task-search">
          <input
            name="taskType"
            required
            autoComplete="off"
            placeholder="Начните писать: сайт, бот, AI..."
            value={taskQuery}
            onChange={(event) => {
              setTaskQuery(event.target.value);
              setIsTaskListOpen(true);
            }}
            onFocus={() => setIsTaskListOpen(true)}
            onBlur={() => window.setTimeout(() => setIsTaskListOpen(false), 120)}
          />
          {isTaskListOpen ? (
            <div className="task-search-list">
              {(filteredTaskOptions.length > 0 ? filteredTaskOptions : ["Другое"]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={taskQuery === option ? "is-active" : ""}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    setTaskQuery(option);
                    setIsTaskListOpen(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </label>
      <label>
        Описание задачи
        <textarea
          name="details"
          required
          rows={5}
          placeholder="Кратко опишите, что нужно сделать и какие сервисы уже используете"
        />
      </label>
      <button className="primary-button" disabled={status === "loading"}>
        {status === "loading" ? "Отправляем..." : "Отправить заявку"}
      </button>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
