"use client";

import { MobileCollapsible } from "./MobileCollapsible";
import { Reveal } from "./Reveal";

export function ServiceGrid({
  items,
  mobileCollapsible = false
}: {
  items: string[];
  mobileCollapsible?: boolean;
}) {
  const grid = (
    <div className="service-grid">
      {items.map((item, index) => (
        <Reveal key={item} className="service-card">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{item}</h3>
        </Reveal>
      ))}
    </div>
  );

  if (mobileCollapsible) {
    return <MobileCollapsible>{grid}</MobileCollapsible>;
  }

  return grid;
}
