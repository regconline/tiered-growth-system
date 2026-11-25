import {
  MonitorSmartphone, Search, Share2, PenLine, Star, MessagesSquare, BarChart3, ShieldCheck, Palette, MousePointerClick,
  Stethoscope, HeartPulse, Pill, Bone, Brain, Hand, Salad, Ear, ScanLine, Ambulance, Leaf, Glasses, Smile, FlaskConical,
  Sprout, Feather, Wrench, Sparkles, type LucideIcon,
} from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "website-services": MonitorSmartphone,
  "seo-services": Search,
  "social-media": Share2,
  "content-marketing": PenLine,
  "reputation-management": Star,
  "patient-communication": MessagesSquare,
  "analytics-reporting": BarChart3,
  compliance: ShieldCheck,
  branding: Palette,
  "conversion-optimization": MousePointerClick,
};

const DOMAIN_ICONS: Record<string, LucideIcon> = {
  "medical-dental": Stethoscope,
  nursing: HeartPulse,
  pharmacy: Pill,
  "physiotherapy-podiatry-biokinetics": Bone,
  psychology: Brain,
  "occupational-therapy-prosthetics-arts-therapy": Hand,
  "dietetics-nutrition": Salad,
  "speech-language-hearing": Ear,
  "radiography-clinical-technology": ScanLine,
  "emergency-care": Ambulance,
  "environmental-health": Leaf,
  "optometry-dispensing-opticians": Glasses,
  "dental-therapy-oral-hygiene": Smile,
  "medical-technology": FlaskConical,
  "allied-health-complementary": Sprout,
  "traditional-health-practitioners": Feather,
  "dental-technicians": Wrench,
};

export function ServiceIcon({ slug, className = "h-5 w-5" }: { slug: string; className?: string }) {
  const Icon = SERVICE_ICONS[slug] ?? Sparkles;
  return <Icon className={className} aria-hidden strokeWidth={1.8} />;
}

export function DomainIcon({ slug, className = "h-5 w-5" }: { slug: string; className?: string }) {
  const Icon = DOMAIN_ICONS[slug] ?? Stethoscope;
  return <Icon className={className} aria-hidden strokeWidth={1.8} />;
}
