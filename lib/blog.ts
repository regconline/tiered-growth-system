import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

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
  const result = await remark().use(remarkHtml, { sanitize: false }).process(markdown);
  return result.toString();
}
