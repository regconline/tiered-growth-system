import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/blog";
import { SITE } from "@/data/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const published = post.pubDate.toISOString();
  const modified = (post.updatedDate ?? post.pubDate).toISOString();
  return {
    title: `${post.title} | REGC Digital`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      url: `/blog/${post.slug}/`,
      type: "article",
      publishedTime: published,
      modifiedTime: modified,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const contentHtml = await renderMarkdown(post.content ?? "");
  const path = `/blog/${post.slug}/`;
  const url = new URL(path, SITE.url).toString();
  const published = post.pubDate.toISOString();
  const modified = (post.updatedDate ?? post.pubDate).toISOString();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: published,
      dateModified: modified,
      inLanguage: "en-ZA",
      articleSection: post.category,
      keywords: post.tags.join(", "),
      author: { "@type": "Organization", name: post.author },
      publisher: { "@id": SITE.url + "#organization" },
      image: new URL(SITE.defaultOg, SITE.url).toString(),
      mainEntityOfPage: url,
      url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: new URL("/blog/", SITE.url).toString() },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <Link href="/blog/" className="inline-flex items-center gap-1 text-sm text-secondary font-semibold mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
          <div className="text-5xl mb-4">{post.heroEmoji}</div>
          <span className="text-xs uppercase tracking-wide text-secondary font-semibold">{post.category}</span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-2 mb-4 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.pubDate.toISOString()}>
              {post.pubDate.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
            </time>
          </div>
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          {post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-border flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
