import type { Metadata } from "next";
import { ContactContent } from "@/components/sections/contact-content";

export const metadata: Metadata = {
  title: "Konsultasi — Nexora Incodeon",
  description: "Mulai konsultasi kebutuhan website atau aplikasi kamu bersama Nexora Incodeon.",
};

export default function ContactPage() {
  return (
    <div>
      <ContactContent />
    </div>
  );
}
