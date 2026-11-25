import { ogCard, OG_SIZE } from "@/lib/og";
import { serviceDetails } from "@/data/serviceDetails";

export const alt = "REGC Digital service";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceDetails.find((x) => x.slug === slug);
  return ogCard({ eyebrow: "Service · Healthcare marketing", title: s ? `${s.title}: ${s.tagline}` : "Healthcare marketing services", footer: "Transparent pricing in rand" });
}
