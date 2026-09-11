import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createClient } from "@/lib/supabase/server";

type BlogDetail = {
  title: string;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  published_at: string | null;
};

async function getPost(slug: string): Promise<BlogDetail | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("title, content, cover_image_url, tags, published_at")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return null;
    return data as BlogDetail;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog — Nexora Incodeon" };
  return { title: `${post.title} — Blog Nexora Incodeon` };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <div>
      <section className="border-b border-ink-line">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Link href="/blog" className="font-label text-xs text-accent">
            ← kembali ke blog
          </Link>
          {post.published_at && (
            <p className="font-label mt-4 text-xs text-ink-fg-muted">
              {new Date(post.published_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink-fg">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-label rounded border border-ink-line px-2.5 py-1 text-xs text-ink-fg-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        {post.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full rounded-lg border border-ink-line"
          />
        )}
        <div className="markdown-body mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </section>
    </div>
  );
}
