/**
 * After a production build on Vercel, tell IndexNow search engines (Bing, Yahoo,
 * DuckDuckGo, Yandex, Seznam…) about every URL in the sitemap so changes are
 * picked up within hours. Never fails the build.
 */
import { readFileSync, existsSync } from "fs";

const KEY = "ce29ca0c21cb219432593eec3148ba09";
const HOST = "www.regcdigital.co.za";

if (process.env.VERCEL_ENV !== "production") {
  console.log("[indexnow] skipped (not a production deploy)");
  process.exit(0);
}

const file = ".next/server/app/sitemap.xml.body";
if (!existsSync(file)) {
  console.log("[indexnow] sitemap not found, skipped");
  process.exit(0);
}
const urls = [...readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

try {
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
    signal: AbortSignal.timeout(15000),
  });
  console.log(`[indexnow] submitted ${urls.length} URLs → HTTP ${res.status}`);
} catch (e) {
  console.log("[indexnow] ping failed (ignored):", e.message);
}
