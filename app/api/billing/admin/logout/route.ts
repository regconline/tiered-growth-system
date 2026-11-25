import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/billing/admin";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/admin/billing/", req.url), 303);
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 0 });
  return res;
}
