import { PortfolioForm } from "../portfolio-form";
import { createPortfolio } from "../actions";

export default function NewPortfolioPage() {
  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-fg">
        Tambah portfolio
      </h1>
      <p className="mt-2 text-sm text-ink-fg-muted">
        Isi detail project, upload gambar cover, lalu pilih status
        &quot;Published&quot; supaya langsung tampil di halaman portfolio.
      </p>
      <PortfolioForm action={createPortfolio} submitLabel="Simpan portfolio" />
    </div>
  );
}
