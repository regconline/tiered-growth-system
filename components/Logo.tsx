/**
 * REGC Digital logo — the original circular "RD Digital" badge, unchanged.
 * Enhanced for the web: transparent edges, crisp WebP at 1×/2×, a thin brand
 * gradient ring, soft glow and a gentle hover lift.
 */

const SRC_1X = "/assets/regc-logo-128.webp";
const SRC_2X = "/assets/regc-logo.webp";

export function LogoMark({ className = "w-10 h-10", alt = "" }: { className?: string; alt?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SRC_1X}
      srcSet={`${SRC_1X} 1x, ${SRC_2X} 2x`}
      width={128}
      height={128}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      decoding="async"
      draggable={false}
      className={`rounded-full object-cover ${className}`}
    />
  );
}

interface Props {
  className?: string;
  /** white wordmark for dark bands (footer) */
  onDark?: boolean;
  showTagline?: boolean;
  size?: "md" | "lg";
}

export default function Logo({ className = "", onDark = false, showTagline = true, size = "md" }: Props) {
  const badge = size === "lg" ? "h-16 w-16" : "h-11 w-11 md:h-12 md:w-12";
  return (
    <span className={`group/logo inline-flex items-center gap-3 select-none ${className}`}>
      <span
        className="relative isolate shrink-0 rounded-full p-[2px] transition-transform duration-500 ease-out group-hover/logo:scale-105 group-hover/logo:-rotate-3"
        style={{ background: "conic-gradient(from 200deg, #f05060, #c4317a, #9b3fc4, #4a0e6e, #f05060)" }}
      >
        <span
          aria-hidden
          className="absolute -inset-1 -z-10 rounded-full opacity-50 blur-md transition-opacity duration-500 group-hover/logo:opacity-90"
          style={{ background: "radial-gradient(circle, rgba(232,64,106,0.6), transparent 70%)" }}
        />
        <LogoMark className={`${badge} block`} alt="REGC Digital logo" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[19px] md:text-[21px] font-extrabold tracking-[-0.03em] ${onDark ? "text-white" : "text-foreground"}`}>
          REGC<span className={`ml-1 font-semibold ${onDark ? "text-gradient-hero" : "text-gradient"}`}>Digital</span>
        </span>
        {showTagline && (
          <span className={`mt-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] ${onDark ? "text-white/55" : "text-muted-foreground"}`}>
            Healthcare Marketing
          </span>
        )}
      </span>
    </span>
  );
}
