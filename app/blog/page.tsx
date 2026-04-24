import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { breadcrumbList } from "@/lib/seo";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Healthcare Marketing Insights | REGC Digital Blog",
  description: "Practical guides, strategies, and insights on digital marketing for South African medical practices.",
  alternates: { canonical: "/blog/" },
  openGraph: { url: "/blog/" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  const jsonLd = [
    breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog/" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Healthcare Marketing Insights | REGC Digital Blog",
      description: "Practical guides, strategies, and insights on digital marketing for South African medical practices.",
      url: new URL("/blog/", SITE.url).toString(),
      publisher: { "@id": SITE.url + "#organization" },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        datePublished: p.pubDate.toISOString(),
        url: new URL(`/blog/${p.slug}/`, SITE.url).toString(),
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-gradient text-primary-foreground py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Insights &amp; Guides</h1>
          <p className="text-lg text-primary-foreground/85">Practical healthcare marketing advice for South African practices.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-5xl mx-auto px-4">
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">No posts yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}/`} className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-secondary transition-all flex flex-col">
                  <div className="text-4xl mb-3">{post.heroEmoji}</div>
                  <span className="text-xs uppercase tracking-wide text-secondary font-semibold mb-2">{post.category}</span>
                  <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">{post.title}</h2>
                  <p className="text-sm text-muted-foreground flex-1">{post.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <time dateTime={post.pubDate.toISOString()}>
                      {post.pubDate.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
                    </time>
                    <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
