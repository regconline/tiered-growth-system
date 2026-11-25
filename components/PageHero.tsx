import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Crumb } from "@/lib/seo";

interface Props {
  crumbs?: Crumb[];
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  icon?: ReactNode;
}

/** Consistent dark brand band used at the top of every inner page. */
export default function PageHero({ crumbs, eyebrow, title, subtitle, children, align = "left", icon }: Props) {
  const center = align === "center";
  return (
    <section className="page-hero">
      <div aria-hidden className="orb orb-drift" style={{ width: 520, height: 520, top: -220, right: -140 }} />
      <div aria-hidden className="orb orb-purple" style={{ width: 460, height: 460, bottom: -260, left: -160 }} />
      <div className={`container relative max-w-6xl px-4 ${center ? "text-center" : ""}`}>
        {crumbs && <Breadcrumbs items={crumbs} className={`mb-8 enter enter-1 ${center ? "flex justify-center" : ""}`} />}
        <div className={center ? "mx-auto max-w-3xl" : "max-w-3xl"}>
          {eyebrow && <div className="mb-5 enter enter-1"><span className="hero-label">{eyebrow}</span></div>}
          <div className={`flex gap-4 ${center ? "justify-center" : ""} items-start`}>
            {icon && <div className="enter enter-2 hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.07] text-4xl">{icon}</div>}
            <h1 className="enter enter-2 font-display text-4xl font-extrabold leading-[1.08] text-white md:text-5xl lg:text-[3.4rem] text-balance">{title}</h1>
          </div>
          {subtitle && <p className={`enter enter-3 mt-5 text-lg leading-relaxed text-white/75 md:text-xl text-pretty ${center ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>{subtitle}</p>}
          {children && <div className="enter enter-4 mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
