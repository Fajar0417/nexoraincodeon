"use client";

type Props = {
  label?: string;
  confirmMessage?: string;
};

export function DeleteButton({
  label = "Hapus",
  confirmMessage = "Yakin mau hapus data ini? Tindakan ini tidak bisa dibatalkan.",
}: Props) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
      className="text-xs text-red-600 hover:text-red-500"
    >
      {label}
    </button>
  );
}
