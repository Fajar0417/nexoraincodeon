import { benefits, type BenefitItem } from "@/lib/data/benefits";

const hueClasses: Record<BenefitItem["hue"], string> = {
  indigo: "text-indigo-600",
  teal: "text-teal-600",
  orange: "text-orange-600",
  rose: "text-rose-600",
  sky: "text-sky-600",
  violet: "text-violet-600",
};

export function Benefits() {
  return (
    <section className="border-b border-ink-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-center font-label text-sm text-ink-fg-muted">
          dampak website untuk bisnis
        </p>
        <h2 className="mx-auto mt-3 max-w-lg text-center font-display text-2xl font-semibold leading-tight text-ink-fg md:text-3xl">
          Enam dampak positif punya website untuk bisnis kamu.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => (
            <div
              key={item.title}
              className="rounded-lg border border-ink-line bg-ink p-6"
            >
              <p className={`font-display text-sm font-semibold ${hueClasses[item.hue]}`}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-display text-base font-semibold text-ink-fg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-fg-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
