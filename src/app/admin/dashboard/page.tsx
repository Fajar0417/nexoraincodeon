import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createClient();

  const [portfolios, posts, messages] = await Promise.all([
    supabase.from("portfolios").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase
      .from("consultation_messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  return {
    portfolios: portfolios.count ?? 0,
    posts: posts.count ?? 0,
    newMessages: messages.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { label: "Portfolio", value: counts.portfolios, href: "/admin/portfolio" },
    { label: "Artikel blog", value: counts.posts, href: "/admin/blog" },
    { label: "Pesan baru", value: counts.newMessages, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-fg">Dashboard</h1>
      <p className="mt-2 text-sm text-ink-fg-muted">Ringkasan singkat konten website kamu.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-lg border border-ink-line bg-ink-panel/60 p-6 transition-colors hover:border-accent"
          >
            <p className="font-label text-xs text-ink-fg-muted">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-ink-fg">
              {card.value}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
