"use client";

export function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Yakin mau hapus portfolio ini? Tindakan ini tidak bisa dibatalkan.")) {
          e.preventDefault();
        }
      }}
      className="text-xs text-red-400 hover:text-red-300"
    >
      Hapus
    </button>
  );
}
