import {
  ShieldCheck,
  Gauge,
  Layers,
  Plug,
  Search,
  BarChart3,
  Palette,
  FileEdit,
  Smartphone,
} from "lucide-react";
import { whyChooseUs, type FeatureItem } from "@/lib/data/why-choose-us";

const iconMap: Record<FeatureItem["icon"], typeof ShieldCheck> = {
  shield: ShieldCheck,
  gauge: Gauge,
  layers: Layers,
  plug: Plug,
  search: Search,
  chart: BarChart3,
  palette: Palette,
  cms: FileEdit,
  devices: Smartphone,
};

const hueClasses: Record<FeatureItem["hue"], string> = {
  teal: "bg-teal-50 text-teal-600",
  orange: "bg-orange-50 text-orange-600",
  indigo: "bg-indigo-50 text-indigo-600",
  rose: "bg-rose-50 text-rose-600",
  sky: "bg-sky-50 text-sky-600",
  violet: "bg-violet-50 text-violet-600",
};

export function WhyChooseUs() {
  return (
    <section className="border-b border-ink-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <p className="font-label text-sm text-accent">kenapa memilih kami</p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink-fg md:text-3xl">
            Website yang dibangun dengan standar teknis yang benar.
          </h2>
          <p className="mt-4 text-sm leading-6 text-ink-fg-muted">
            Selain tampilan yang bagus, kami pastikan fondasi teknisnya juga
            kuat — dari keamanan sampai performa.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-lg border border-ink-line bg-ink p-6"
              >
                <div
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-md ${hueClasses[item.hue]}`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink-fg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-fg-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
