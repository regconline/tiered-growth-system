import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | REGC Digital",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="py-32 text-center">
      <div className="container max-w-xl mx-auto px-4">
        <p className="font-display text-6xl font-bold text-secondary mb-4">404</p>
        <h1 className="font-display text-3xl font-bold text-foreground mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has moved.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">Back to home</Link>
      </div>
    </section>
  );
}
