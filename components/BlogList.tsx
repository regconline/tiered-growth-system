"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, Clock } from "lucide-react";

export interface BlogCard {
  slug: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  date: string; // ISO
  minutes: number;
}

export default function BlogList({ posts, categories }: { posts: BlogCard[]; categories: string[] }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!term || p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)),
    );
  }, [posts, cat, q]);

  const [featured, ...rest] = filtered;
  const showFeatured = cat === "All" && !q && featured;

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                cat === c ? "border-transparent text-white" : "bg-card text-muted-foreground hover:text-foreground hover:border-secondary/40"
              }`}
              style={cat === c ? { background: "var(--gradient-cta)" } : undefined}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Search articles</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" className="field !pl-10" type="search" />
        </label>
      </div>

      {filtered.length === 0 && <p className="py-16 text-center text-muted-foreground">No articles match your search.</p>}

      {showFeatured && (
        <Link href={`/blog/${featured.slug}/`} className="card card-hover group mb-8 grid overflow-hidden md:grid-cols-2">
          <div className="relative flex min-h-[220px] items-center justify-center" style={{ background: "var(--gradient-hero)" }}>
            <span className="text-7xl transition-transform duration-500 group-hover:scale-110">{featured.emoji}</span>
            <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">Latest</span>
          </div>
          <div className="flex flex-col justify-center p-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{featured.category}</span>
            <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-foreground group-hover:text-secondary transition-colors md:text-3xl">{featured.title}</h2>
            <p className="mt-3 text-muted-foreground">{featured.description}</p>
            <p className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
              <time dateTime={featured.date}>{new Date(featured.date).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}</time>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.minutes} min read</span>
            </p>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(showFeatured ? rest : filtered).map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}/`} className="card card-hover group flex flex-col overflow-hidden">
            <div className="flex h-32 items-center justify-center bg-muted bg-grid">
              <span className="text-5xl transition-transform duration-500 group-hover:scale-110">{p.emoji}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">{p.category}</span>
              <h2 className="mt-2 font-display text-lg font-bold leading-snug text-foreground group-hover:text-secondary transition-colors">{p.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.minutes} min read</span>
                <span className="inline-flex items-center gap-1 font-semibold text-secondary">Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
