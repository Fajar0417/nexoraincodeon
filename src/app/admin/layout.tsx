import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./login/actions";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminMobileNav } from "@/components/admin/mobile-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Halaman login mengurus alurnya sendiri (tidak butuh guard/topbar ini).
  if (!user) {
    return <>{children}</>;
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("full_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-ink">
      <header className="flex items-center justify-between border-b border-ink-line px-6 py-4">
        <div className="flex items-center gap-3">
          <AdminMobileNav />
          <div>
            <p className="font-label text-xs text-accent">nexora-incodeon / admin</p>
            <p className="mt-1 text-sm text-ink-fg">
              {admin.full_name} <span className="text-ink-fg-muted">· {admin.role}</span>
            </p>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md border border-ink-line px-4 py-2 text-sm text-ink-fg-muted transition-colors hover:border-ink-fg-muted hover:text-ink-fg"
          >
            Keluar
          </button>
        </form>
      </header>
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
