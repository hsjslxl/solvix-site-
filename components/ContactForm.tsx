"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";
type ContactMethod = "telegram" | "email" | "phone";

const contactMethods: Array<{ value: ContactMethod; label: string }> = [
  { value: "telegram", label: "Telegram" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Телефон" }
];

const contactFields: Record<
  ContactMethod,
  { label: string; placeholder: string; type: "text" | "email" | "tel" }
> = {
  telegram: { label: "Ваш Telegram", placeholder: "@username", type: "text" },
  email: { label: "Ваш email", placeholder: "name@example.com", type: "email" },
  phone: { label: "Ваш номер телефона", placeholder: "+7 ...", type: "tel" }
};

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
  const [contactMethod, setContactMethod] = useState<ContactMethod>("telegram");
  const [startedAt, setStartedAt] = useState(() => Date.now());

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
      setContactMethod("telegram");
      setStartedAt(Date.now());
      setStatus("success");
      setMessage("Заявка отправлена. Мы свяжемся с вами по указанному контакту.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error && error.message !== "Request failed"
          ? error.message
          : "Не удалось отправить заявку. Попробуйте отправить форму еще раз чуть позже."
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label>
        Имя
        <input name="name" required maxLength={80} placeholder="Как к вам обращаться" />
      </label>
      <fieldset className="contact-method-fieldset">
        <legend>Где с вами связаться</legend>
        <div className="contact-method-picker">
          {contactMethods.map((method) => (
            <label key={method.value}>
              <input
                type="radio"
                name="contactMethod"
                value={method.value}
                checked={contactMethod === method.value}
                onChange={() => setContactMethod(method.value)}
              />
              <span>{method.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        {contactFields[contactMethod].label}
        <input
          name="contact"
          type={contactFields[contactMethod].type}
          required
          maxLength={120}
          autoComplete={contactMethod === "email" ? "email" : contactMethod === "phone" ? "tel" : "off"}
          placeholder={contactFields[contactMethod].placeholder}
        />
      </label>
      <label>
        Тип задачи
        <div className="task-search">
          <input
            name="taskType"
            required
            maxLength={100}
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
          maxLength={3000}
          rows={5}
          placeholder="Кратко опишите, что нужно сделать и какие сервисы уже используете"
        />
      </label>
      <label className="consent-field">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          Я согласен с обработкой данных согласно{" "}
          <Link href="/privacy">политике конфиденциальности</Link>
        </span>
      </label>
      <div className="spam-trap" aria-hidden="true">
        <label>
          Не заполняйте это поле
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />
      <button className="primary-button" disabled={status === "loading"}>
        {status === "loading" ? "Отправляем..." : "Отправить заявку"}
      </button>
      {message ? <p className={`form-message ${status}`}>{message}</p> : null}
    </form>
  );
}
