import { Triangle, Database, FileCode2, Paintbrush } from "lucide-react";

const stack = [
  { name: "Next.js & React", icon: Triangle },
  { name: "Supabase (PostgreSQL)", icon: Database },
  { name: "TypeScript", icon: FileCode2 },
  { name: "Tailwind CSS", icon: Paintbrush },
];

const points = [
  { label: "Next.js & React", detail: "performa tinggi, SEO-friendly sejak awal" },
  { label: "Supabase", detail: "database PostgreSQL yang aman dan skalabel" },
  { label: "TypeScript", detail: "kode lebih stabil, bug lebih minim" },
  { label: "Tailwind CSS", detail: "desain konsisten, waktu pengembangan lebih cepat" },
];

export function TechStack() {
  return (
    <section className="border-b border-ink-line bg-ink-panel/60">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="font-label text-sm text-accent">teknologi</p>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink-fg md:text-3xl">
            Teknologi modern, bukan sekadar tren.
          </h2>
          <p className="mt-4 text-sm leading-6 text-ink-fg-muted">
            Kami pilih tools yang punya rekam jejak jelas untuk kestabilan dan
            performa jangka panjang.
          </p>

          <ul className="mt-8 space-y-4">
            {points.map((point) => (
              <li key={point.label} className="flex items-start gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <p className="text-sm text-ink-fg-muted">
                  <span className="font-medium text-ink-fg">{point.label}</span> —{" "}
                  {point.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 md:col-span-3">
          {stack.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="flex flex-col items-center justify-center gap-3 rounded-lg border border-ink-line bg-ink p-8 text-center"
              >
                <Icon className="h-8 w-8 text-accent" aria-hidden="true" />
                <p className="text-sm font-medium text-ink-fg">{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
