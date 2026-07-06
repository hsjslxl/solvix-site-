"use client";

import { PropsWithChildren, useState } from "react";

type MobileCollapsibleProps = PropsWithChildren<{
  className?: string;
}>;

export function MobileCollapsible({ children, className = "" }: MobileCollapsibleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`mobile-collapsible${open ? " is-open" : ""} ${className}`}>
      <button
        className="mobile-list-toggle"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? "Скрыть список" : "Показать список"}
      </button>
      <div className="mobile-collapsible-content">{children}</div>
    </div>
  );
}
