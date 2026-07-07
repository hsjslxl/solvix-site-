type PlanName = "Start" | "Standard" | "Pro";

type ProductPlan = {
  name: PlanName;
  price: string;
  features: string[];
};

type Product = {
  name: string;
  description: string;
  timeline: string;
  plans: ProductPlan[];
};

const products: Product[] = [
  {
    name: "Лендинг",
    description:
      "Одностраничный сайт для услуги, продукта или запуска рекламы. Помогает быстро объяснить предложение и собрать заявки.",
    timeline: "2-4 дня",
    plans: [
      { name: "Start", price: "$59", features: ["1 экран", "форма заявки", "базовая адаптация"] },
      { name: "Standard", price: "$129", features: ["до 5 блоков", "мобильная версия", "подключение аналитики"] },
      { name: "Pro", price: "$229", features: ["расширенная структура", "анимации", "SEO-база"] }
    ]
  },
  {
    name: "Сайт-визитка",
    description:
      "Небольшой сайт для компании, эксперта или локального бизнеса. Показывает услуги, контакты и доверительные блоки.",
    timeline: "3-5 дней",
    plans: [
      { name: "Start", price: "$79", features: ["главная страница", "контакты", "адаптивная верстка"] },
      { name: "Standard", price: "$179", features: ["до 4 страниц", "карта и контакты", "базовое SEO"] },
      { name: "Pro", price: "$299", features: ["расширенный контент", "микроанимации", "подготовка к рекламе"] }
    ]
  },
  {
    name: "Каталог товаров",
    description:
      "Каталог без сложной интернет-магазинной логики. Подходит для демонстрации ассортимента и сбора заявок.",
    timeline: "5-8 дней",
    plans: [
      { name: "Start", price: "$149", features: ["до 20 товаров", "карточки товаров", "заявка с товара"] },
      { name: "Standard", price: "$249", features: ["категории", "фильтры", "до 60 товаров"] },
      { name: "Pro", price: "$399", features: ["поиск", "импорт из таблицы", "расширенные карточки"] }
    ]
  },
  {
    name: "Telegram Lead Bot",
    description:
      "Бот, который принимает заявки, задает уточняющие вопросы и отправляет данные менеджеру или в таблицу.",
    timeline: "2-4 дня",
    plans: [
      { name: "Start", price: "$69", features: ["сбор контакта", "уведомление в Telegram", "простая логика"] },
      { name: "Standard", price: "$149", features: ["ветки вопросов", "Google Sheets", "UTM-метки"] },
      { name: "Pro", price: "$249", features: ["статусы заявок", "CRM webhook", "несколько менеджеров"] }
    ]
  },
  {
    name: "Бот записи",
    description:
      "Telegram-бот для записи клиентов на услугу или консультацию. Упрощает выбор времени и снижает ручную переписку.",
    timeline: "3-5 дней",
    plans: [
      { name: "Start", price: "$99", features: ["выбор услуги", "заявка на время", "уведомление"] },
      { name: "Standard", price: "$179", features: ["слоты", "напоминания", "таблица записей"] },
      { name: "Pro", price: "$299", features: ["несколько специалистов", "отмена записи", "интеграции"] }
    ]
  },
  {
    name: "FAQ Bot",
    description:
      "Бот с готовыми ответами на частые вопросы. Подходит для поддержки, продаж и первичной консультации клиентов.",
    timeline: "1-3 дня",
    plans: [
      { name: "Start", price: "$59", features: ["до 20 вопросов", "кнопки меню", "контакт менеджера"] },
      { name: "Standard", price: "$129", features: ["разделы FAQ", "поиск по темам", "история вопросов"] },
      { name: "Pro", price: "$199", features: ["расширенное меню", "сценарии", "таблица статистики"] }
    ]
  },
  {
    name: "AI FAQ Bot",
    description:
      "AI-помощник, который отвечает клиентам по информации вашей компании. Может работать с FAQ, текстами и документами.",
    timeline: "2-4 дня",
    plans: [
      { name: "Start", price: "$99", features: ["подключение OpenAI", "ответы по FAQ", "до 20 вопросов"] },
      { name: "Standard", price: "$199", features: ["база знаний", "документы", "Telegram", "история диалогов"] },
      { name: "Pro", price: "$349", features: ["расширенная база", "роли пользователей", "интеграции", "кастомный промпт"] }
    ]
  },
  {
    name: "AI Chat Assistant",
    description:
      "Чат-ассистент для сайта или внутренней команды. Отвечает на вопросы, собирает данные и помогает с рутинными запросами.",
    timeline: "4-7 дней",
    plans: [
      { name: "Start", price: "$149", features: ["чат-виджет", "базовый промпт", "сбор контактов"] },
      { name: "Standard", price: "$249", features: ["история диалогов", "база знаний", "настройка тона"] },
      { name: "Pro", price: "$399", features: ["интеграции", "права доступа", "аналитика диалогов"] }
    ]
  },
  {
    name: "AI Knowledge Base",
    description:
      "База знаний с AI-поиском по материалам компании. Помогает сотрудникам быстро находить инструкции и ответы.",
    timeline: "5-9 дней",
    plans: [
      { name: "Start", price: "$199", features: ["загрузка материалов", "AI-поиск", "простая панель"] },
      { name: "Standard", price: "$299", features: ["категории", "документы", "история запросов"] },
      { name: "Pro", price: "$499", features: ["роли", "расширенные источники", "интеграции"] }
    ]
  },
  {
    name: "CRM Lite",
    description:
      "Легкая CRM для заявок, клиентов и статусов. Подходит, когда таблиц уже мало, а большая CRM пока избыточна.",
    timeline: "5-8 дней",
    plans: [
      { name: "Start", price: "$149", features: ["клиенты", "статусы", "комментарии"] },
      { name: "Standard", price: "$249", features: ["воронка", "фильтры", "ответственные"] },
      { name: "Pro", price: "$399", features: ["отчеты", "экспорт", "интеграции"] }
    ]
  },
  {
    name: "Sales Dashboard",
    description:
      "Панель для контроля заявок, продаж и ключевых показателей. Собирает данные в один понятный экран.",
    timeline: "4-7 дней",
    plans: [
      { name: "Start", price: "$149", features: ["основные метрики", "таблица заявок", "ручное обновление"] },
      { name: "Standard", price: "$279", features: ["графики", "фильтры", "автообновление"] },
      { name: "Pro", price: "$449", features: ["несколько источников", "роли", "экспорт отчетов"] }
    ]
  },
  {
    name: "Панель администратора",
    description:
      "Внутренняя панель для управления контентом, заявками или операциями. Делает рабочие процессы прозрачнее.",
    timeline: "6-10 дней",
    plans: [
      { name: "Start", price: "$199", features: ["таблица данных", "редактирование", "базовые права"] },
      { name: "Standard", price: "$349", features: ["фильтры", "формы", "несколько ролей"] },
      { name: "Pro", price: "$499", features: ["аудит действий", "интеграции", "расширенные сценарии"] }
    ]
  },
  {
    name: "Автоматизация заявок",
    description:
      "Связка формы, уведомлений, таблиц и статусов. Помогает не терять обращения и быстрее передавать их в работу.",
    timeline: "2-4 дня",
    plans: [
      { name: "Start", price: "$79", features: ["форма", "Telegram-уведомление", "таблица"] },
      { name: "Standard", price: "$149", features: ["UTM", "статусы", "автоответ"] },
      { name: "Pro", price: "$249", features: ["CRM webhook", "несколько каналов", "отчеты"] }
    ]
  },
  {
    name: "Email Automation",
    description:
      "Автоматические письма после заявки, покупки или действия клиента. Подходит для простых цепочек коммуникации.",
    timeline: "1-3 дня",
    plans: [
      { name: "Start", price: "$49", features: ["1 письмо", "шаблон", "отправка после формы"] },
      { name: "Standard", price: "$99", features: ["цепочка писем", "переменные", "сегменты"] },
      { name: "Pro", price: "$179", features: ["условия", "аналитика", "интеграция с CRM"] }
    ]
  },
  {
    name: "Автоматизация документов",
    description:
      "Генерация документов из форм, таблиц или CRM. Ускоряет подготовку договоров, актов и коммерческих предложений.",
    timeline: "3-6 дней",
    plans: [
      { name: "Start", price: "$99", features: ["1 шаблон", "заполнение полей", "PDF"] },
      { name: "Standard", price: "$199", features: ["несколько шаблонов", "таблица данных", "отправка"] },
      { name: "Pro", price: "$349", features: ["пакетная генерация", "права", "интеграции"] }
    ]
  },
  {
    name: "Онлайн-запись",
    description:
      "Система записи на услуги, консультации или встречи. Клиент выбирает вариант, а команда получает структурированную заявку.",
    timeline: "3-6 дней",
    plans: [
      { name: "Start", price: "$99", features: ["форма записи", "уведомления", "таблица"] },
      { name: "Standard", price: "$179", features: ["слоты времени", "напоминания", "изменение записи"] },
      { name: "Pro", price: "$299", features: ["несколько услуг", "календарь", "интеграции"] }
    ]
  },
  {
    name: "Price Parser",
    description:
      "Парсер цен конкурентов или поставщиков. Собирает данные в таблицу для сравнения и регулярного контроля.",
    timeline: "3-5 дней",
    plans: [
      { name: "Start", price: "$79", features: ["1 источник", "цены", "таблица"] },
      { name: "Standard", price: "$149", features: ["до 3 источников", "расписание", "статусы"] },
      { name: "Pro", price: "$249", features: ["больше источников", "алерты", "отчеты"] }
    ]
  },
  {
    name: "Парсер товаров",
    description:
      "Сбор карточек товаров, характеристик и ссылок. Подходит для анализа ассортимента или подготовки каталога.",
    timeline: "4-7 дней",
    plans: [
      { name: "Start", price: "$99", features: ["1 сайт", "названия и цены", "экспорт"] },
      { name: "Standard", price: "$199", features: ["характеристики", "изображения", "категории"] },
      { name: "Pro", price: "$349", features: ["несколько сайтов", "обновления", "очистка данных"] }
    ]
  },
  {
    name: "Data Dashboard",
    description:
      "Дашборд для таблиц, выгрузок и бизнес-данных. Превращает разрозненные цифры в понятные отчеты.",
    timeline: "4-8 дней",
    plans: [
      { name: "Start", price: "$149", features: ["1 источник", "таблицы", "ключевые метрики"] },
      { name: "Standard", price: "$249", features: ["графики", "фильтры", "автообновление"] },
      { name: "Pro", price: "$399", features: ["несколько источников", "права", "экспорт"] }
    ]
  },
  {
    name: "Интеграция OpenAI",
    description:
      "Подключение OpenAI к сайту, боту или внутреннему процессу. Помогает автоматизировать ответы, анализ и генерацию текстов.",
    timeline: "3-6 дней",
    plans: [
      { name: "Start", price: "$99", features: ["API-подключение", "базовый промпт", "один сценарий"] },
      { name: "Standard", price: "$199", features: ["несколько сценариев", "логирование", "настройка ответа"] },
      { name: "Pro", price: "$349", features: ["интеграции", "ограничения", "кастомная логика"] }
    ]
  },
  {
    name: "Другое",
    description:
      "Если вы не нашли точный формат задачи, напишите свой вариант. Разберем идею и предложим понятный первый шаг.",
    timeline: "после обсуждения",
    plans: [
      { name: "Start", price: "по задаче", features: ["короткий разбор", "оценка первого шага", "понятный план"] },
      { name: "Standard", price: "по задаче", features: ["структура решения", "этапы запуска", "подбор инструментов"] },
      { name: "Pro", price: "по задаче", features: ["кастомная логика", "интеграции", "развитие проекта"] }
    ]
  }
];

export const metadata = {
  title: "Solvix - продукты"
};

export default function ProductsPage() {
  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="shell products-hero-inner">
          <div className="products-hero-copy">
            <p className="eyebrow">Продукты</p>
            <h1>Каталог цифровых продуктов для быстрого запуска</h1>
            <p>
              Готовые направления с понятными сроками, прозрачной комплектацией и
              тарифами до $500. Выберите продукт, а детали адаптируем под ваш бизнес.
            </p>
          </div>
          <a className="products-hero-action" href="/contact">
            Связаться
          </a>
        </div>
      </section>

      <section className="products-catalog">
        <div className="shell">
          <div className="products-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-card-head">
                  <div>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                  </div>
                  <div className="product-time">
                    <span>Срок</span>
                    <strong>{product.timeline}</strong>
                  </div>
                </div>

                <div className="product-plans">
                  {product.plans.map((plan) => (
                    <section className="product-plan" key={plan.name}>
                      <div className="product-plan-top">
                        <h3>{plan.name}</h3>
                        <strong>{plan.price}</strong>
                      </div>
                      <ul>
                        {plan.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>

                <a className="product-contact-button" href="/contact">
                  Связаться
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
