import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has moved.",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/services/", label: "Our services" },
  { href: "/domains/", label: "Industries we serve" },
  { href: "/blog/", label: "Blog & guides" },
  { href: "/contact/", label: "Contact us" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="container max-w-xl px-4 text-center">
        <p className="font-display text-8xl font-extrabold text-gradient md:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-foreground">This page has moved or doesn&apos;t exist</h1>
        <p className="mt-3 text-muted-foreground">Let&apos;s get you back on track.</p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn-primary"><Home className="h-4 w-4" /> Back to home</Link>
        </div>
        <ul className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="card card-hover flex items-center justify-between px-5 py-4 text-sm font-semibold text-foreground">
                {l.label} <ArrowRight className="h-4 w-4 text-secondary" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
