import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/blog";
import AnimateIn from "@/components/AnimateIn";
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

  const jsonLd: object[] = [
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

  if (post.faqs && post.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <AnimateIn>
            <Link href="/blog/" className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary mb-8 hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>

            <div className="text-5xl mb-5">{post.heroEmoji}</div>
            <span className="section-label">{post.category}</span>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-5 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
              <span className="font-medium text-foreground">{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <time dateTime={post.pubDate.toISOString()}>
                {post.pubDate.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" })}
              </time>
            </div>
          </AnimateIn>

          <AnimateIn delay={80}>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </AnimateIn>

          {/* FAQ visual section */}
          {post.faqs && post.faqs.length > 0 && (
            <AnimateIn delay={120} className="mt-14">
              <div className="divider-glow mb-10" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">Frequently asked questions</h2>
              <div className="space-y-3">
                {post.faqs.map((faq, i) => (
                  <details key={i} className="group bg-card border border-border rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-display font-semibold text-foreground text-sm select-none hover:bg-muted/40 transition-colors">
                      {faq.question}
                      <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </AnimateIn>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <AnimateIn delay={160} className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full">#{tag}</span>
              ))}
            </AnimateIn>
          )}

          {/* CTA */}
          <AnimateIn delay={200} className="mt-14">
            <div className="hero-gradient text-primary-foreground rounded-3xl p-8 text-center">
              <p className="font-display text-xl font-bold mb-3">Ready to grow your practice?</p>
              <p className="text-primary-foreground/75 text-sm mb-5">Book a free, no-obligation consultation with our healthcare marketing team.</p>
              <Link href="/contact/" className="btn-primary inline-flex">
                Book a free consultation →
              </Link>
            </div>
          </AnimateIn>
        </div>
      </article>
    </>
  );
}
