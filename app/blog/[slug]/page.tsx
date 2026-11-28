import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, CalendarDays, RefreshCw } from "lucide-react";
import { getAllPosts, getPostBySlug, renderMarkdown, readingTime, getRelatedPosts, extractHeadings, addHeadingIds, CATEGORY_SERVICE } from "@/lib/blog";
import { serviceDetails } from "@/data/serviceDetails";
import { cities } from "@/data/locations";
import { ServiceIcon } from "@/components/ServiceIcon";
import { SITE } from "@/data/site";
import { abs, faqSchema, pageMetadata } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import ShareButtons from "@/components/ShareButtons";
import ReadingProgress from "@/components/ReadingProgress";
import { LogoMark } from "@/components/Logo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}/`,
      keywords: post.tags,
      type: "article",
      ogImage: `/blog/${post.slug}/opengraph-image/`,
      publishedTime: post.pubDate.toISOString(),
      modifiedTime: (post.updatedDate ?? post.pubDate).toISOString(),
    }),
    authors: [{ name: post.author }],
  };
}

const fmt = (d: Date) => d.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || post.draft) notFound();

  const html = addHeadingIds(await renderMarkdown(post.content ?? ""));
  const headings = extractHeadings(post.content ?? "");
  const minutes = readingTime(post.content);
  const related = getRelatedPosts(post, 3);
  const path = `/blog/${post.slug}/`;
  const url = abs(path);
  const modified = post.updatedDate ?? post.pubDate;
  const service = serviceDetails.find((s) => s.slug === (CATEGORY_SERVICE[post.category] ?? "website-services"));
  const topCities = cities.slice(0, 10);

  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": url + "#article",
      headline: post.title,
      description: post.description,
      datePublished: post.pubDate.toISOString(),
      dateModified: modified.toISOString(),
      inLanguage: "en-ZA",
      articleSection: post.category,
      keywords: post.tags.join(", "),
      wordCount: (post.content ?? "").split(/\s+/).length,
      timeRequired: `PT${minutes}M`,
      author: { "@type": "Organization", name: post.author, url: SITE.url + "/" },
      publisher: { "@id": SITE.url + "/#organization" },
      image: abs(`/blog/${post.slug}/opengraph-image/`),
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      isPartOf: { "@id": abs("/blog/") + "#blog" },
    },
  ];
  if (post.faqs?.length) jsonLd.push(faqSchema(post.faqs.map((f) => ({ q: f.question, a: f.answer }))));

  return (
    <>
      <JsonLd data={jsonLd} />
      <ReadingProgress />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }, { name: post.title, path }]}
        eyebrow={<>{post.heroEmoji} {post.category}</>}
        title={post.title}
        subtitle={post.description}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/65">
          <span className="inline-flex items-center gap-2"><LogoMark className="h-6 w-6" /> {post.author}</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> <time dateTime={post.pubDate.toISOString()}>{fmt(post.pubDate)}</time></span>
          {post.updatedDate && <span className="inline-flex items-center gap-1.5"><RefreshCw className="h-4 w-4" /> Updated {fmt(post.updatedDate)}</span>}
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {minutes} min read</span>
        </div>
      </PageHero>

      <div className="container max-w-6xl px-4 py-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_260px]">
          <article className="min-w-0">
            <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-h2:mt-12" dangerouslySetInnerHTML={{ __html: html }} />

            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t pt-6">
                {post.tags.map((t) => <span key={t} className="chip">#{t}</span>)}
              </div>
            )}

            <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <ShareButtons url={url} title={post.title} />
              <Link href="/blog/" className="text-sm font-semibold text-secondary hover:underline underline-offset-4">← All articles</Link>
            </div>

            {service && (
              <Link href={`/services/${service.slug}/`} className="card card-hover group mt-12 flex items-start gap-4 p-6">
                <span className="icon-tile h-12 w-12 shrink-0 text-secondary"><ServiceIcon slug={service.slug} className="h-6 w-6" /></span>
                <span className="min-w-0">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Related service</span>
                  <span className="mt-1 block font-display text-lg font-bold text-foreground group-hover:text-secondary transition-colors">{service.title} for healthcare practices</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{service.tagline}</span>
                </span>
                <ArrowRight className="ml-auto mt-1 h-5 w-5 shrink-0 text-secondary transition-transform group-hover:translate-x-1" />
              </Link>
            )}

            <div className="hero-gradient mt-6 rounded-3xl p-8 md:p-10">
              <p className="font-display text-2xl font-extrabold text-white">Want this done for your practice?</p>
              <p className="mt-2 max-w-lg text-white/70">Book a free consultation and we&apos;ll show you exactly where your practice can win more patients online.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact/" className="btn-primary">Book a free consultation <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/services/" className="btn-ghost">See services</Link>
              </div>
            </div>

            <nav aria-label="Healthcare marketing by city" className="mt-8">
              <p className="text-sm font-semibold text-foreground">We help practices across South Africa</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {topCities.map((c) => (
                  <Link key={c.slug} href={`/healthcare-marketing-${c.slug}/`} className="chip hover:border-secondary/50 hover:text-foreground">{c.name}</Link>
                ))}
                <Link href="/locations/" className="chip font-semibold text-secondary hover:border-secondary/50">All locations →</Link>
              </div>
            </nav>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {headings.length > 2 && (
                <nav aria-label="On this page" className="card p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
                  <ol className="mt-3 space-y-2 text-sm">
                    {headings.map((h) => (
                      <li key={h.id}><a href={`#${h.id}`} className="block leading-snug text-foreground/75 transition-colors hover:text-secondary">{h.text}</a></li>
                    ))}
                  </ol>
                </nav>
              )}
              <div className="card p-5">
                <p className="font-display font-bold text-foreground">{service ? `Need help with ${service.title.toLowerCase()}?` : "Free practice marketing review"}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">We&apos;ll audit your website, Google profile and reviews — no obligation.</p>
                <Link href={service ? `/services/${service.slug}/#enquire` : "/contact/"} className="btn-primary mt-4 w-full !py-2.5">Get a free quote</Link>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t pt-14" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display text-2xl font-extrabold text-foreground md:text-3xl">Keep reading</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="card card-hover group flex flex-col p-6">
                  <span className="text-4xl">{p.heroEmoji}</span>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-secondary">{p.category}</span>
                  <h3 className="mt-1.5 font-display font-bold leading-snug text-foreground group-hover:text-secondary transition-colors">{p.title}</h3>
                  <span className="mt-3 text-xs text-muted-foreground">{readingTime(p.content)} min read</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
