import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Portfolio — Nexora Incodeon",
  description: "Kumpulan project website dan aplikasi yang sudah dikerjakan Nexora Incodeon.",
};

type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  cover_image_url: string | null;
  tech_stack: string[];
  is_featured: boolean;
};

async function getPortfolios(): Promise<PortfolioItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolios")
      .select("id, title, slug, category, description, cover_image_url, tech_stack, is_featured")
      .eq("status", "published")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as PortfolioItem[];
  } catch {
    return [];
  }
}

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();

  return (
    <div>
      <section className="blueprint-grid border-b border-ink-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-label text-sm text-accent">portfolio</p>
          <h1 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight text-ink-fg md:text-4xl">
            Project yang sudah kami bangun.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-ink-fg-muted">
            Sebagian project yang pernah kami kerjakan bersama klien dari
            berbagai skala bisnis.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {portfolios.length === 0 ? (
          <p className="text-sm text-ink-fg-muted">
            Portfolio belum tersedia saat ini. Hubungi kami untuk melihat
            contoh project sebelumnya.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {portfolios.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group block overflow-hidden rounded-lg border border-ink-line bg-ink-panel/60 transition-colors hover:border-accent"
              >
                <div className="blueprint-grid flex aspect-video items-center justify-center border-b border-ink-line bg-ink-panel">
                  {item.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.cover_image_url}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-label text-xs text-ink-fg-muted">
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-label text-xs text-accent">{item.category}</p>
                  <h2 className="mt-2 font-display text-lg font-semibold text-ink-fg transition-colors group-hover:text-accent">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-fg-muted">
                    {item.description}
                  </p>
                  {item.tech_stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tech_stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-label rounded border border-ink-line px-2 py-0.5 text-[11px] text-ink-fg-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
