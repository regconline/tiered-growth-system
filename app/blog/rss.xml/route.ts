import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/data/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map((p) => {
      const url = `${SITE.url}/blog/${p.slug}/`;
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${p.pubDate.toUTCString()}</pubDate><category>${esc(p.category)}</category><description>${esc(p.description)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>REGC Digital Blog</title><link>${SITE.url}/blog/</link><description>Healthcare marketing guides for South African practices.</description><language>en-za</language><atom:link href="${SITE.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>${posts[0] ? `<lastBuildDate>${posts[0].pubDate.toUTCString()}</lastBuildDate>` : ""}${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
