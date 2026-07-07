import Link from "next/link";
import { cases, processSteps, techStack } from "@/lib/data";
import { ContactForm } from "./ContactForm";
import { MobileCollapsible } from "./MobileCollapsible";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceGrid as ResponsiveServiceGrid } from "./ServiceGrid";

export function Hero() {
  return (
    <section className="hero">
      <div className="shell hero-grid">
        <Reveal className="hero-copy">
          <p className="eyebrow">Solvix / digital systems studio</p>
          <h1>Solvix проектирует и внедряет цифровые решения для бизнеса</h1>
          <p className="hero-text">
            Автоматизируем процессы, создаем сайты, Telegram-ботов, интеграции,
            внутренние панели и AI-инструменты для малого бизнеса, средних компаний
            и B2B-команд.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/contact">
              Обсудить проект
            </Link>
            <Link className="secondary-button" href="/small-business">
              Посмотреть решения
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceGrid({
  items,
  mobileCollapsible = false
}: {
  items: string[];
  mobileCollapsible?: boolean;
}) {
  return <ResponsiveServiceGrid items={items} mobileCollapsible={mobileCollapsible} />;
}

export function ProcessBlock({
  eyebrow = "Процесс",
  mobileCollapsible = false
}: {
  eyebrow?: string;
  mobileCollapsible?: boolean;
}) {
  const timeline = (
    <div className="timeline">
      {processSteps.map((step, index) => (
        <Reveal className="timeline-item" key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{step}</p>
        </Reveal>
      ))}
    </div>
  );

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={eyebrow}
          title="Работаем короткими этапами, чтобы результат был виден до финала"
          text="Сначала разбираем задачу, затем показываем промежуточный результат и только после проверки доводим систему до запуска."
        />
        {mobileCollapsible ? <MobileCollapsible>{timeline}</MobileCollapsible> : timeline}
      </div>
    </section>
  );
}

export function TrustBlock() {
  const items = [
    "Показываем промежуточный результат, а не исчезаем до финала",
    "Передаем доступы, инструкции и структуру проекта",
    "Работаем по этапам, чтобы бюджет был контролируемым",
    "Не усложняем там, где достаточно простого надежного решения",
    "Объясняем технические решения обычным языком"
  ];

  return (
    <section className="section muted-section">
      <div className="shell split">
        <Reveal>
          <SectionHeading
            eyebrow="Доверие"
            title="Solvix выглядит как система, а не случайный подрядчик"
            text="Мы фиксируем, что делаем, зачем это бизнесу и какой результат должен появиться после внедрения."
          />
        </Reveal>
        <div className="proof-list">
          {items.map((item) => (
            <Reveal className="proof-item" key={item}>
              {item}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CasesPreview() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Проекты"
          title="Демонстрационные примеры показывают тип задач, которые можно быстро внедрить"
          text="Это не выдуманные отзывы, а понятные сценарии решений для малого бизнеса и внутренних команд."
        />
        <MobileCollapsible>
          <div className="case-grid">
            {cases.slice(0, 3).map((item) => (
              <Reveal className="case-card" key={item.title}>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.result}</strong>
              </Reveal>
            ))}
          </div>
        </MobileCollapsible>
        <Link className="text-link" href="/cases">
          Смотреть все кейсы
        </Link>
      </div>
    </section>
  );
}

export function PricingBlock() {
  const plans = [
    ["Старт", "от $300", "Небольшая автоматизация, форма, таблица, уведомления или технический фикс."],
    ["Бизнес", "от $700", "Сайт, бот, интеграция, контроль заявок или связка из нескольких сервисов."],
    ["Системы", "после диагностики", "Внутренние панели, API-интеграции, процессы отделов и корпоративные инструменты."]
  ];

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Стоимость"
          title="Для малых задач показываем ориентиры, для сложных систем сначала проводим диагностику"
        />
        <MobileCollapsible>
          <div className="pricing-grid">
            {plans.map(([name, price, text]) => (
              <Reveal className="price-card" key={name}>
                <h3>{name}</h3>
                <strong>{price}</strong>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </MobileCollapsible>
      </div>
    </section>
  );
}

export function TechBlock() {
  return (
    <section className="section compact-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Технологии"
          title="Подбираем стек под задачу, а не ради сложности"
        />
        <div className="tech-cloud">
          {techStack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section contact-section">
      <div className="shell contact-grid">
        <Reveal>
          <SectionHeading
            eyebrow="Связаться"
            title="Опишите задачу, и мы предложим первый технический шаг"
            text="Можно начать с диагностики сайта, формы, бота, таблицы, CRM или внутреннего процесса."
          />
        </Reveal>
        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
