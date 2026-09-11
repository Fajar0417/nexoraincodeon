import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/constants";

const serviceLinks = [
  { href: "/services", label: "Website development" },
  { href: "/services", label: "E-commerce" },
  { href: "/services", label: "Custom system" },
  { href: "/services", label: "Maintenance & support" },
];

const companyLinks = [
  { href: "/about", label: "Tentang kami" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pricing", label: "Harga" },
  { href: "/blog", label: "Blog" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-line">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-base font-semibold text-ink-fg">
            Nexora <span className="text-accent">Incodeon</span>
          </p>
          <p className="mt-3 max-w-[220px] text-sm leading-6 text-ink-fg-muted">
            Transforming ideas into digital solutions.
          </p>
        </div>

        <div>
          <p className="font-label text-xs text-ink-fg-muted">Layanan</p>
          <ul className="mt-4 space-y-3">
            {serviceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-fg-muted transition-colors hover:text-ink-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-label text-xs text-ink-fg-muted">Perusahaan</p>
          <ul className="mt-4 space-y-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-fg-muted transition-colors hover:text-ink-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-label text-xs text-ink-fg-muted">Kontak</p>
          <ul className="mt-4 space-y-3 text-sm text-ink-fg-muted">
            <li>hello@nexoraincodeon.com</li>
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent transition-colors hover:text-accent-dim"
              >
                Mulai konsultasi
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line px-6 py-6">
        <p className="mx-auto max-w-6xl text-xs text-ink-fg-muted">
          © {year} Nexora Incodeon. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  );
}
