"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Layanan" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Proses" },
  { href: "/pricing", label: "Harga" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Tentang" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-base font-semibold text-ink-fg">
          Nexora <span className="text-accent">Incodeon</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-ink-fg-muted transition-colors hover:text-ink-fg"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-md bg-accent px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dim md:inline-block"
        >
          Konsultasi gratis
        </Link>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-ink-fg transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-ink-fg transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-line px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-ink-fg-muted transition-colors hover:text-ink-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-block rounded-md bg-accent px-5 py-2 text-sm font-medium text-white"
              >
                Konsultasi gratis
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
