import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbList, type Crumb } from "@/lib/seo";

/** Visible breadcrumb trail (for dark hero bands) + matching BreadcrumbList schema. */
export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <>
      <JsonLd data={breadcrumbList(items)} />
      <nav aria-label="Breadcrumb" className={`text-sm text-white/65 ${className}`}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.path} className="inline-flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-medium text-white/90 line-clamp-1">{c.name}</span>
                ) : (
                  <>
                    <Link href={c.path} className="transition-colors hover:text-white">{c.name}</Link>
                    <ChevronRight className="h-3.5 w-3.5 text-white/35" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
