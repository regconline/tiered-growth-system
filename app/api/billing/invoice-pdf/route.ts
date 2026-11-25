import { db } from "@/lib/billing/db";
import { invoicePdf } from "@/lib/billing/pdf";
import { isAdmin } from "@/lib/billing/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Download an invoice PDF: /api/billing/invoice-pdf/?t=<pay token>  (or ?id= for the admin). */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const token = u.searchParams.get("t");
  const id = u.searchParams.get("id");
  const inv = token ? await db.getByToken(token) : id && (await isAdmin()) ? await db.getInvoice(id) : null;
  if (!inv) return new Response("Not found", { status: 404 });
  const pdf = await invoicePdf(inv);
  return new Response(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${inv.number}${inv.status === "paid" ? "-paid" : ""}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
