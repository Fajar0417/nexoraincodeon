import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type BlogListItem = {
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  tags: string[];
  published_at: string | null;
};

async function getPosts(): Promise<BlogListItem[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("title, slug, excerpt, cover_image_url, tags, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error || !data) return [];
    return data as BlogListItem[];
  } catch {
    return [];
  }
}

export async function BlogContent() {
  const posts = await getPosts();

  return (
    <>
      <section className="blueprint-grid border-b border-ink-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-label text-sm text-accent">blog</p>
          <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight text-ink-fg md:text-4xl">
            Catatan seputar teknologi dan produk digital.
          </h2>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {posts.length === 0 ? (
          <p className="text-sm text-ink-fg-muted">Belum ada artikel yang diterbitkan.</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-lg border border-ink-line bg-ink-panel/60 transition-colors hover:border-accent"
              >
                <div className="blueprint-grid flex aspect-video items-center justify-center border-b border-ink-line bg-ink-panel">
                  {post.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-label text-xs text-ink-fg-muted">artikel</span>
                  )}
                </div>
                <div className="p-5">
                  {post.published_at && (
                    <p className="font-label text-xs text-ink-fg-muted">
                      {new Date(post.published_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                  <h3 className="mt-2 font-display text-lg font-semibold text-ink-fg transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-fg-muted">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
