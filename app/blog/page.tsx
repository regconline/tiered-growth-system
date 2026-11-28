import type { Metadata } from "next";
import { getAllPosts, getCategories, readingTime } from "@/lib/blog";
import { abs, pageMetadata } from "@/lib/seo";
import { SITE } from "@/data/site";
import PageHero from "@/components/PageHero";
import BlogList from "@/components/BlogList";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Healthcare Marketing Blog — Guides for SA Practices",
  description:
    "Practical guides on medical websites, social media, content, Google reviews and HPCSA-aware marketing for South African doctors, dentists and clinics.",
  path: "/blog/",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories().map((c) => c.name);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": abs("/blog/") + "#blog",
          name: "REGC Digital Blog",
          description: "Healthcare marketing guides for South African practices.",
          url: abs("/blog/"),
          inLanguage: "en-ZA",
          publisher: { "@id": SITE.url + "/#organization" },
          blogPost: posts.slice(0, 20).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            datePublished: p.pubDate.toISOString(),
            url: abs(`/blog/${p.slug}/`),
          })),
        }}
      />
      <PageHero
        crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog/" }]}
        eyebrow={`${posts.length} articles`}
        title={<>Insights &amp; guides for <span className="text-gradient-hero">growing practices</span></>}
        subtitle="Practical, South African advice on websites, Google, social media, reviews and compliant healthcare marketing."
      />
      <section className="py-16 md:py-20">
        <div className="container max-w-6xl px-4">
          <BlogList
            categories={categories}
            posts={posts.map((p) => ({
              slug: p.slug,
              title: p.title,
              description: p.description,
              category: p.category,
              emoji: p.heroEmoji,
              date: p.pubDate.toISOString(),
              minutes: readingTime(p.content),
            }))}
          />
        </div>
      </section>
    </>
  );
}
