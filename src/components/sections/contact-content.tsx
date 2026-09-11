import { ContactForm } from "@/app/(public)/contact/contact-form";

export function ContactContent() {
  return (
    <>
      <section className="blueprint-grid border-b border-ink-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-label text-sm text-accent">konsultasi</p>
          <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight text-ink-fg md:text-4xl">
            Ceritakan kebutuhan kamu, kami bantu carikan solusinya.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-ink-fg-muted">
            Isi form di bawah, tim kami akan menghubungi kamu untuk diskusi
            lebih lanjut — tanpa biaya, tanpa komitmen.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-3">
          <ContactForm />
        </div>

        <div className="md:col-span-2">
          <div className="rounded-lg border border-ink-line bg-ink-panel/60 p-6">
            <p className="font-label text-xs text-ink-fg-muted">kontak langsung</p>
            <p className="mt-3 text-sm text-ink-fg">hello@nexoraincodeon.com</p>
            <p className="font-label mt-6 text-xs text-ink-fg-muted">respons</p>
            <p className="mt-3 text-sm text-ink-fg-muted">
              Kami biasanya membalas dalam 1-2 hari kerja.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
