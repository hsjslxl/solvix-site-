import { ServiceGrid, TechBlock } from "@/components/Blocks";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { enterpriseServices } from "@/lib/data";

export const metadata = {
  title: "Solvix - B2B и корпоративные решения"
};

export default function EnterprisePage() {
  return (
    <>
      <section className="subhero">
        <div className="shell narrow">
          <p className="eyebrow">Системы</p>
          <h1>Внутренние инструменты, интеграции и автоматизация для команд</h1>
          <p>
            Создаем системы для отделов продаж, поддержки, операций, логистики,
            HR и руководителей, которым нужен контроль над данными и процессами.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Инструменты"
            title="Проектируем инструменты вокруг существующих процессов компании"
            text="Подключаемся к CRM, ERP, складам, API и внутренним сервисам. Сложные технические части объясняем в виде понятного плана внедрения."
          />
          <ServiceGrid items={enterpriseServices} />
        </div>
      </section>
      <section className="section muted-section">
        <div className="shell split">
          <Reveal>
            <SectionHeading
              eyebrow="Диагностика"
              title="Стоимость корпоративных задач рассчитывается после короткого разбора"
              text="Перед оценкой фиксируем цель, участников процесса, источники данных, ограничения и ожидаемый результат."
            />
          </Reveal>
          <div className="proof-list">
            {[
              "Карта процесса и слабых мест",
              "Архитектура решения простым языком",
              "Оценка этапов и рисков",
              "План внедрения без остановки текущей работы"
            ].map((item) => (
              <Reveal className="proof-item" key={item}>
                {item}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <TechBlock />
    </>
  );
}
