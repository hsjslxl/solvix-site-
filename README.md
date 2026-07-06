# Solvix

Многостраничный сайт IT-студии на Next.js.

## Запуск

```bash
npm install
npm run dev
```

## Формы

Форма отправляет заявку в `/api/contact`. Telegram и SMS включаются через переменные окружения:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `SMS_RU_API_ID`
- `LEAD_RECIPIENT_EMAIL`

Без ключей API форма вернет успешный ответ и покажет данные в серверном логе. Для реального Gmail-уведомления нужен SMTP/API-провайдер, например Resend, SendGrid, Mailgun или SMTP-доступ.
