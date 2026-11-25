import { ogCard, OG_SIZE } from "@/lib/og";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const alt = "REGC Digital blog article";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return ogCard({ eyebrow: `Blog · ${post?.category ?? "Insights"}`, title: post?.title ?? "REGC Digital Blog", footer: "regcdigital.co.za/blog" });
}
