import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { cases } from "@/lib/data";

export const metadata = {
  title: "Solvix - демонстрационные кейсы"
};

export default function CasesPage() {
  return (
    <>
      <section className="subhero">
        <div className="shell narrow">
          <p className="eyebrow">Проекты</p>
          <h1>Примеры решений, которые можно адаптировать под реальный бизнес</h1>
          <p>
            Здесь показаны демонстрационные сценарии. Они объясняют формат задач,
            которые Solvix может внедрить для малого бизнеса и B2B-команд.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Примеры"
            title="Каждый кейс привязан к понятному результату"
          />
          <div className="case-grid case-grid-wide">
            {cases.map((item) => (
              <Reveal className="case-card" key={item.title}>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.result}</strong>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
