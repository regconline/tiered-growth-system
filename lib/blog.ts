import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  author: string;
  category: string;
  tags: string[];
  heroEmoji: string;
  draft: boolean;
  content?: string;
  faqs?: FaqItem[];
}

/** Extract FAQ pairs from a "## Frequently asked questions" section */
export function extractFaqs(markdown: string): FaqItem[] {
  const faqMatch = markdown.match(/##\s+Frequently asked questions\s*\n([\s\S]*?)(?=\n##\s+|\n---|\n<!--|$)/i);
  if (!faqMatch) return [];

  const block = faqMatch[1];
  const items: FaqItem[] = [];
  const questionBlocks = block.split(/(?=\*\*[^*]+\??\*\*)/g).filter(Boolean);

  for (const chunk of questionBlocks) {
    const qMatch = chunk.match(/^\*\*(.+?)\*\*\s*\n+([\s\S]+?)(?:\n\n|$)/);
    if (qMatch) {
      items.push({
        question: qMatch[1].trim(),
        answer: qMatch[2].trim().replace(/\n+/g, " "),
      });
    }
  }
  return items;
}

function parsePost(filePath: string, fileName: string): BlogPost {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = fileName.replace(/\.md$/, "");
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    pubDate: new Date(data.pubDate),
    updatedDate: data.updatedDate ? new Date(data.updatedDate) : undefined,
    author: data.author ?? "REGC Digital",
    category: data.category ?? "Healthcare Marketing",
    tags: data.tags ?? [],
    heroEmoji: data.heroEmoji ?? "📰",
    draft: data.draft ?? false,
    content,
    faqs: extractFaqs(content),
  };
}

export function getAllPosts(includeDrafts = false): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((f) => parsePost(path.join(BLOG_DIR, f), f))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(filePath, `${slug}.md`);
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown);
  return result.toString();
}

/** Estimated reading time in minutes (~220 wpm). */
export function readingTime(markdown?: string): number {
  if (!markdown) return 1;
  const words = markdown.replace(/[#>*_`\-\[\]()!|]/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Posts most related to `post` — same category first, then shared tags, then newest. */
export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const tags = new Set(post.tags.map((t) => t.toLowerCase()));
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score: (p.category === post.category ? 3 : 0) + p.tags.filter((t) => tags.has(t.toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score || b.p.pubDate.valueOf() - a.p.pubDate.valueOf())
    .slice(0, count)
    .map((x) => x.p);
}

/** h2 headings for a table of contents, with ids matching `addHeadingIds`. */
export function extractHeadings(markdown: string): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  for (const line of markdown.split("\n")) {
    const m = line.match(/^##\s+(.+?)\s*#*$/);
    if (m) {
      const text = m[1].replace(/[*_`]/g, "").trim();
      out.push({ id: slugify(text), text });
    }
  }
  return out;
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/&[a-z]+;/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}

/** Adds id attributes to rendered <h2>/<h3> so the TOC and deep links work. */
export function addHeadingIds(html: string) {
  return html.replace(/<h([23])>(.*?)<\/h\1>/g, (_m, level, inner) => {
    const text = String(inner).replace(/<[^>]+>/g, "");
    return `<h${level} id="${slugify(text)}">${inner}</h${level}>`;
  });
}

/** All categories with post counts. */
export function getCategories(): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of getAllPosts()) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return [...map.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}

/** Which service page each blog category should feed (internal linking for SEO). */
export const CATEGORY_SERVICE: Record<string, string> = {
  SEO: "website-services",
  "Google Ads": "website-services",
  "Website Development": "website-services",
  "Social Media": "social-media",
  "Content Marketing": "content-marketing",
  Reputation: "reputation-management",
  "Patient Communication": "website-services",
  Compliance: "content-marketing",
  "Digital Marketing": "website-services",
};

/** Healthcare-specific guides (used on location pages). */
export function getHealthcareGuides(count = 3, seed = 0): BlogPost[] {
  const hc = getAllPosts().filter((p) =>
    /medical|doctor|dental|dentist|practice|patient|healthcare|hpcsa|popia|physio|psycholog/i.test(p.title + " " + p.slug),
  );
  if (hc.length <= count) return hc;
  const start = seed % hc.length;
  return [...hc.slice(start), ...hc.slice(0, start)].slice(0, count);
}
