import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { SHOWCASE } from "@/data/showcase";

export const runtime = "nodejs";
export const maxDuration = 60;
// Regenerate at most once a week; the CDN serves the cached image in between.
export const revalidate = 604800;

export function generateStaticParams() {
  return [];
}

const CACHE = "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Only the sites in our own portfolio list can be captured.
  const site = SHOWCASE.find((s) => s.slug === slug);
  if (!site) return new Response("Not found", { status: 404 });

  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(site.url, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2500));
    // Hide floating chat buttons, cookie bars and similar overlays near the bottom of the screen.
    await page.evaluate(() => {
      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        const s = getComputedStyle(el);
        if ((s.position === "fixed" || s.position === "sticky") && el.getBoundingClientRect().top > 400) el.style.display = "none";
      });
      window.scrollTo(0, 0);
    });
    const shot = await page.screenshot({ type: "webp", quality: 78 });
    return new Response(Buffer.from(shot), {
      headers: { "Content-Type": "image/webp", "Cache-Control": CACHE },
    });
  } catch (err) {
    // Throwing (rather than returning an error image) keeps a failed capture out of the cache.
    throw new Error(`Showcase capture failed for ${site.domain}: ${(err as Error).message}`);
  } finally {
    await browser?.close().catch(() => {});
  }
}
