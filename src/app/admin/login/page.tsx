import { LoginForm } from "./login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <p className="font-label text-sm text-accent">nexora-incodeon / admin</p>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink-fg">
          Masuk ke dashboard
        </h1>
        <p className="mt-2 text-sm text-ink-fg-muted">
          Khusus tim internal Nexora Incodeon.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
