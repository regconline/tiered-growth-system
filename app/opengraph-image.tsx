import { ogCard, OG_SIZE } from "@/lib/og";

export const alt = "REGC Digital — Healthcare Digital Marketing in South Africa";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Healthcare digital marketing · South Africa", title: "More patients. Fully booked diaries.", footer: "Websites · Social media · Content · Branding" });
}
