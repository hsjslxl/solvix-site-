import {
  CasesPreview,
  Hero,
  PricingBlock,
  ProcessBlock,
  ServiceGrid,
  TechBlock,
  TrustBlock
} from "@/components/Blocks";
import { MobileCollapsible } from "@/components/MobileCollapsible";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { enterpriseServices, smallBusinessServices } from "@/lib/data";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="page-group">
        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Решения"
              title="Быстро закрываем задачи, которые мешают получать заявки и управлять работой"
              text="Подключаем формы, ботов, таблицы, сайты, аналитику и простые системы учета без долгой разработки."
            />
            <ServiceGrid items={smallBusinessServices.slice(0, 6)} mobileCollapsible />
            <Link className="text-link" href="/small-business">
              Все решения
            </Link>
          </div>
        </section>
        <section className="section muted-section">
          <div className="shell">
            <SectionHeading
              eyebrow="Системы"
              title="Для компаний строим внутренние инструменты и интеграции"
              text="Связываем сервисы, автоматизируем отделы и делаем рабочие панели для компаний, которым нужен контроль над процессом."
            />
            <ServiceGrid items={enterpriseServices.slice(0, 6)} mobileCollapsible />
            <Link className="text-link" href="/enterprise">
              Корпоративные системы
            </Link>
          </div>
        </section>
      </div>
      <div className="page-group page-group-accent">
        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Фокус"
              title="Берем задачи, где программирование должно дать понятный бизнес-результат"
            />
            <MobileCollapsible>
              <div className="task-grid">
                {[
                  "Заявки с сайта сразу попадают в Telegram и таблицу",
                  "Менеджер видит статус клиента и следующий шаг",
                  "Владелец получает отчет без ручной сборки данных",
                  "Клиент считает стоимость услуги до разговора",
                  "Данные из CRM, сайта и таблиц собираются в одном месте",
                  "Повторяющиеся действия заменяются скриптом или ботом"
                ].map((item) => (
                  <Reveal className="task-card" key={item}>
                    {item}
                  </Reveal>
                ))}
              </div>
            </MobileCollapsible>
          </div>
        </section>
        <ProcessBlock eyebrow="Процессы" mobileCollapsible />
        <TrustBlock />
      </div>
      <div className="page-group">
        <CasesPreview />
        <PricingBlock />
        <TechBlock />
      </div>
    </>
  );
}
