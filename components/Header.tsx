"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const nav = [
  { href: "/small-business", label: "Решения" },
  { href: "/enterprise", label: "Системы" },
  { href: "/cases", label: "Проекты" },
  { href: "/contact", label: "Связаться" }
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
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
