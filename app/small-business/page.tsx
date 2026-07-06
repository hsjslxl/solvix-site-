import { ProcessBlock, ServiceGrid } from "@/components/Blocks";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { smallBusinessServices } from "@/lib/data";

export const metadata = {
  title: "Solvix - решения для малого бизнеса"
};

export default function SmallBusinessPage() {
  return (
    <>
      <section className="subhero">
        <div className="shell narrow">
          <p className="eyebrow">Решения</p>
          <h1>Цифровые решения, которые помогают не терять заявки, время и контроль</h1>
          <p>
            Делаем сайты, ботов, автоматизацию таблиц, интеграции и простые CRM для
            бизнесов, которым нужен быстрый практический результат.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Услуги"
            title="Закрываем технические задачи без лишней сложности"
            text="Если процесс можно сделать проще через форму, бота, таблицу, скрипт или сайт, мы проектируем понятное решение и запускаем его."
          />
          <ServiceGrid items={smallBusinessServices} />
        </div>
      </section>
      <section className="section muted-section">
        <div className="shell">
          <SectionHeading
            eyebrow="Пакеты"
            title="Можно стартовать с маленькой задачи и расширять систему постепенно"
          />
          <div className="pricing-grid">
            {[
              ["Фикс", "от $150", "Починка формы, кнопки, уведомления, таблицы или небольшой ошибки."],
              ["Автоматизация", "от $300", "Заявка, Telegram, Google Sheets, автоответ, UTM и простой отчет."],
              ["Запуск", "от $700", "Лендинг, бот, калькулятор или мини-CRM с передачей инструкции."]
            ].map(([name, price, text]) => (
              <Reveal className="price-card" key={name}>
                <h3>{name}</h3>
                <strong>{price}</strong>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ProcessBlock />
    </>
  );
}
