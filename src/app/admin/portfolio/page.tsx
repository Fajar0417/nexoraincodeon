import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePortfolio } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";

type PortfolioRow = {
  id: string;
  title: string;
  category: string;
  status: "draft" | "published";
  is_featured: boolean;
};

async function getAllPortfolios(): Promise<PortfolioRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("portfolios")
    .select("id, title, category, status, is_featured")
    .order("created_at", { ascending: false });

  return (data as PortfolioRow[]) ?? [];
}

export default async function AdminPortfolioPage() {
  const portfolios = await getAllPortfolios();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-ink-fg">Portfolio</h1>
        <Link
          href="/admin/portfolio/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
        >
          + Tambah portfolio
        </Link>
      </div>

      {portfolios.length === 0 ? (
        <p className="mt-8 text-sm text-ink-fg-muted">Belum ada portfolio.</p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border border-ink-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-line bg-ink-panel text-ink-fg-muted">
                <th className="px-4 py-3 font-normal">Judul</th>
                <th className="px-4 py-3 font-normal">Kategori</th>
                <th className="px-4 py-3 font-normal">Status</th>
                <th className="px-4 py-3 font-normal">Unggulan</th>
                <th className="px-4 py-3 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((item) => (
                <tr key={item.id} className="border-b border-ink-line last:border-0">
                  <td className="px-4 py-3 text-ink-fg">{item.title}</td>
                  <td className="px-4 py-3 text-ink-fg-muted">{item.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        item.status === "published"
                          ? "bg-accent/20 text-accent"
                          : "bg-ink-panel-raised text-ink-fg-muted"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-fg-muted">
                    {item.is_featured ? "Ya" : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/portfolio/${item.id}/edit`}
                        className="text-xs text-ink-fg-muted hover:text-ink-fg"
                      >
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deletePortfolio(item.id);
                        }}
                      >
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
