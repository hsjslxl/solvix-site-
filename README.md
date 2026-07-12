# Solvix

Многостраничный сайт IT-студии на Next.js.

## Запуск

```bash
npm install
npm run dev
```

## Формы

Форма отправляет заявку в `/api/contact`. В Cloudflare Pages бот работает через Telegram webhook, а лиды сохраняются в D1:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `TELEGRAM_WEBHOOK_SECRET`
- D1 binding `DB`

Без этих переменных форма безопасно вернёт `503` и не покажет пользователю ложный успех.
