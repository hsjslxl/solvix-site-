"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

export function CollapsibleServiceGrid({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`mobile-solutions ${open ? "is-open" : ""}`}>
      <p className="mobile-solutions-copy">
        Собираем заявки, сайты, ботов, таблицы, интеграции и аналитику в понятную
        рабочую систему для бизнеса.
      </p>
      <button
        className="secondary-button mobile-solutions-toggle"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        {open ? "Свернуть" : "Смотреть полностью"}
      </button>
      <div className="service-grid mobile-solutions-grid">
        {items.map((item, index) => (
          <Reveal key={item} className="service-card">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item}</h3>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
