import { ProcessBlock, ServiceGrid } from "@/components/Blocks";
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
      <ProcessBlock />
    </>
  );
}
