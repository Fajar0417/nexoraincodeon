import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PortfolioDetail = {
  title: string;
  category: string;
  client_name: string | null;
  description: string;
  cover_image_url: string | null;
  gallery_urls: string[];
  tech_stack: string[];
  project_url: string | null;
};

async function getPortfolio(slug: string): Promise<PortfolioDetail | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("portfolios")
      .select(
        "title, category, client_name, description, cover_image_url, gallery_urls, tech_stack, project_url"
      )
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return null;
    return data as PortfolioDetail;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const portfolio = await getPortfolio(slug);

  if (!portfolio) return { title: "Portfolio — Nexora Incodeon" };

  return {
    title: `${portfolio.title} — Portfolio Nexora Incodeon`,
    description: portfolio.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolio = await getPortfolio(slug);

  if (!portfolio) notFound();

  return (
    <div>
      <section className="border-b border-ink-line">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link href="/portfolio" className="font-label text-xs text-accent">
            ← kembali ke portfolio
          </Link>
          <p className="font-label mt-4 text-sm text-accent">{portfolio.category}</p>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink-fg md:text-4xl">
            {portfolio.title}
          </h1>
          {portfolio.client_name && (
            <p className="mt-3 text-sm text-ink-fg-muted">
              Klien: {portfolio.client_name}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        {portfolio.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portfolio.cover_image_url}
            alt={portfolio.title}
            className="w-full rounded-lg border border-ink-line"
          />
        )}

        <p className="mt-8 max-w-2xl text-sm leading-7 text-ink-fg-muted">
          {portfolio.description}
        </p>

        {portfolio.tech_stack.length > 0 && (
          <div className="mt-8">
            <p className="font-label text-xs text-ink-fg-muted">tech stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {portfolio.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="font-label rounded border border-ink-line px-2.5 py-1 text-xs text-ink-fg-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {portfolio.gallery_urls.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {portfolio.gallery_urls.map((url) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={url}
                src={url}
                alt=""
                className="w-full rounded-lg border border-ink-line"
              />
            ))}
          </div>
        )}

        {portfolio.project_url && (
          <a
            href={portfolio.project_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
          >
            Kunjungi live site
          </a>
        )}
      </section>
    </div>
  );
}
