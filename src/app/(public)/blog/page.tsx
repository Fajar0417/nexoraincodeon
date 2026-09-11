import type { Metadata } from "next";
import { BlogContent } from "@/components/sections/blog-content";

export const metadata: Metadata = {
  title: "Blog — Nexora Incodeon",
  description: "Artikel seputar pengembangan website, teknologi, dan tips digital dari Nexora Incodeon.",
};

export default function BlogPage() {
  return (
    <div>
      <BlogContent />
    </div>
  );
}
