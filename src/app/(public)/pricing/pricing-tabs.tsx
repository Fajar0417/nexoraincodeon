"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, User, Briefcase, Home, Package } from "lucide-react";
import { services } from "@/lib/data/services";

export type PlanCard = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  price_label: string | null;
  duration_label: string | null;
  features: string[];
  extra_note: string | null;
  is_popular: boolean;
};

type Props = {
  plansByService: Record<string, PlanCard[]>;
};

function pickIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("pelajar")) return User;
  if (lower.includes("bisnis")) return Briefcase;
  if (lower.includes("umkm")) return Home;
  return Package;
}

function formatPrice(plan: PlanCard) {
  if (plan.price == null) return plan.price_label ?? "Hubungi kami";
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(plan.price);
  return formatted;
}

export function PricingTabs({ plansByService }: Props) {
  const servicesWithPlans = services.filter(
    (s) => (plansByService[s.slug]?.length ?? 0) > 0
  );
  const [active, setActive] = useState(servicesWithPlans[0]?.slug ?? services[0].slug);

  if (servicesWithPlans.length === 0) {
    return (
      <p className="text-sm text-ink-fg-muted">
        Paket harga belum tersedia saat ini. Hubungi kami untuk penawaran
        langsung.
      </p>
    );
  }

  const activePlans = plansByService[active] ?? [];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {servicesWithPlans.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => setActive(service.slug)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              active === service.slug
                ? "bg-accent text-white"
                : "border border-ink-line bg-ink text-ink-fg-muted hover:text-ink-fg"
            }`}
          >
            Harga {service.title}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {activePlans.map((plan) => {
          const Icon = pickIcon(plan.name);
          return (
            <div
              key={plan.id}
              className={`overflow-hidden rounded-lg border ${
                plan.is_popular ? "border-accent" : "border-ink-line"
              } bg-ink`}
            >
              {plan.is_popular && (
                <div className="bg-accent py-2 text-center font-label text-xs font-medium text-white">
                  PALING LARIS
                </div>
              )}
              <div className="p-6 text-center">
                <Icon className="mx-auto h-8 w-8 text-ink-fg-muted" aria-hidden="true" />
                <h3 className="mt-3 font-display text-base font-semibold uppercase tracking-wide text-ink-fg">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="mt-2 text-sm leading-6 text-ink-fg-muted">
                    {plan.description}
                  </p>
                )}
                <p className="mt-4 font-display text-2xl font-semibold text-ink-fg">
                  {formatPrice(plan)}
                  {plan.price != null && plan.duration_label && (
                    <span className="text-sm font-normal text-ink-fg-muted">
                      {" "}
                      {plan.duration_label}
                    </span>
                  )}
                </p>
              </div>

              <ul className="space-y-3 border-t border-ink-line px-6 py-6 text-left">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-ink-fg-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="border-t border-ink-line p-6 text-center">
                <Link
                  href="/contact"
                  className={`block w-full rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
                    plan.is_popular
                      ? "bg-accent text-white hover:bg-accent-dim"
                      : "border border-ink-line text-ink-fg hover:border-ink-fg-muted"
                  }`}
                >
                  Hubungi Kami
                </Link>
                {plan.extra_note && (
                  <p className="mt-3 text-xs text-ink-fg-muted">{plan.extra_note}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
