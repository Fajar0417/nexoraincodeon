"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="font-label text-xs text-ink-fg-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="admin@nexoraincodeon.com"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="password" className="font-label text-xs text-ink-fg-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dim disabled:opacity-60"
      >
        {pending ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
