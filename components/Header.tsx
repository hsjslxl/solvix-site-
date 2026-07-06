import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const nav = [
  { href: "/small-business", label: "Решения" },
  { href: "/enterprise", label: "Системы" },
  { href: "/cases", label: "Проекты" },
  { href: "/contact", label: "Связаться" }
];

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className="main-nav" aria-label="Основная навигация">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileMenu items={nav} />
      </div>
    </header>
  );
}
