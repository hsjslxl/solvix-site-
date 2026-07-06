import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Logo />
          <p>
            Solvix проектирует и внедряет цифровые решения для бизнес-процессов,
            заявок, сайтов, ботов и внутренних инструментов.
          </p>
        </div>
        <div>
          <h3>Разделы</h3>
          <Link href="/small-business">Решения</Link>
          <Link href="/enterprise">Системы</Link>
          <Link href="/cases">Проекты</Link>
          <Link href="/contact">Связаться</Link>
        </div>
      </div>
    </footer>
  );
}
