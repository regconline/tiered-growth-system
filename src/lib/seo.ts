import { SITE } from "@/data/site";

export type Crumb = { name: string; path: string };

export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: new URL(c.path, SITE.url).toString(),
    })),
  };
}

export function itemList<T>(
  items: T[],
  toEntry: (item: T, i: number) => { name: string; url: string; description?: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => {
      const e = toEntry(item, i);
      return {
        "@type": "ListItem",
        position: i + 1,
        name: e.name,
        url: new URL(e.url, SITE.url).toString(),
        ...(e.description ? { description: e.description } : {}),
      };
    }),
  };
}
