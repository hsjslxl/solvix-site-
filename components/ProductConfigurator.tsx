"use client";

import { useMemo, useState } from "react";

type PlanName = "Start" | "Standard" | "Pro";

type ProductPlan = {
  name: PlanName;
  price: string;
  features: string[];
};

type Product = {
  name: string;
  description: string;
  timeline: string;
  plans: ProductPlan[];
};

const planLabels: Record<PlanName, string> = {
  Start: "Lite",
  Standard: "Standart",
  Pro: "Pro"
};

export function ProductConfigurator({ products }: { products: Product[] }) {
  const [selectedProductName, setSelectedProductName] = useState(products[0]?.name || "");
  const [selectedPlanName, setSelectedPlanName] = useState<PlanName>("Standard");

  const selectedProduct = useMemo(
    () => products.find((product) => product.name === selectedProductName) || products[0],
    [products, selectedProductName]
  );

  const selectedPlan =
    selectedProduct?.plans.find((plan) => plan.name === selectedPlanName) ||
    selectedProduct?.plans[0];

  return (
    <section className="products-catalog">
      <div className="shell">
        <div className="product-configurator">
          <div className="product-picker">
            <div className="product-picker-head">
              <p className="eyebrow">Выбор продукта</p>
              <h2>Выберите услугу и формат запуска</h2>
              <p>
                Сначала выберите продукт из списка, затем уровень тарифа. Цена ниже
                является ориентиром для первого обсуждения.
              </p>
            </div>

            <div className="product-chip-list" aria-label="Список продуктов">
              {products.map((product) => (
                <button
                  className={product.name === selectedProduct?.name ? "is-active" : ""}
                  key={product.name}
                  type="button"
                  onClick={() => setSelectedProductName(product.name)}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div>

          <div className="plan-picker" aria-label="Выбор тарифа">
            {(["Start", "Standard", "Pro"] as PlanName[]).map((planName) => (
              <button
                className={selectedPlanName === planName ? "is-active" : ""}
                key={planName}
                type="button"
                onClick={() => setSelectedPlanName(planName)}
              >
                {planLabels[planName]}
              </button>
            ))}
          </div>

          {selectedProduct && selectedPlan ? (
            <div className="product-estimate">
              <div>
                <span>Вы выбрали</span>
                <h3>{selectedProduct.name}</h3>
                <p>{selectedProduct.description}</p>
              </div>

              <div className="estimate-panel">
                <span>Примерная стоимость</span>
                <strong>
                  ≈ {selectedPlan.price}
                </strong>
                <p>Срок: {selectedProduct.timeline}</p>
              </div>

              <div className="estimate-details">
                <h4>{planLabels[selectedPlan.name]} включает</h4>
                <ul>
                  {selectedPlan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <p className="estimate-note">
                Точная цена согласуется после обсуждения деталей. Если объём задачи
                остаётся близким к выбранному формату, финальная стоимость обычно не
                отличается сильно от показанного ориентира.
              </p>

              <a className="product-contact-button" href="/contact">
                Связаться
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
