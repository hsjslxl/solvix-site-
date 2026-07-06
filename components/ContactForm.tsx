"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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
        <select name="taskType" required defaultValue="">
          <option value="" disabled>
            Выберите направление
          </option>
          <option>Автоматизация заявок</option>
          <option>Сайт или лендинг</option>
          <option>Telegram-бот</option>
          <option>Интеграция с CRM / таблицами</option>
          <option>Внутренний инструмент</option>
          <option>Другое</option>
        </select>
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
