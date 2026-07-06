import { ContactSection } from "@/components/Blocks";

export const metadata = {
  title: "Solvix - связаться"
};

export default function ContactPage() {
  return (
    <>
      <section className="subhero">
        <div className="shell narrow">
          <p className="eyebrow">Связаться</p>
          <h1>Расскажите, какой процесс, сайт, бот или интеграцию нужно запустить</h1>
          <p>
            После заявки можно обсудить задачу, оценить первый этап и понять, какой
            результат стоит сделать в первую очередь.
          </p>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
