import { useId } from "react";

/**
 * REGC Digital logo — vector, theme-aware, zero network requests.
 * Mark: gradient squircle with a geometric "R" monogram and a coral
 * "pulse" dot (nod to the original logo's square accent + healthcare).
 */
export function LogoMark({ className = "w-9 h-9", title }: { className?: string; title?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 40 40" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={`g-${id}`} x1="4" y1="2" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9b3fc4" />
          <stop offset="0.55" stopColor="#c4317a" />
          <stop offset="1" stopColor="#f05060" />
        </linearGradient>
        <linearGradient id={`s-${id}`} x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="11" fill={`url(#g-${id})`} />
      <rect x="1" y="1" width="38" height="38" rx="11" fill={`url(#s-${id})`} />
      <path
        d="M13.5 29.5V10.5h7.75a5.9 5.9 0 0 1 0 11.8H13.5M20.4 22.3l6.6 7.2"
        fill="none"
        stroke="#fff"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="29.2" cy="11.2" r="2.6" fill="#fff" />
      <circle cx="29.2" cy="11.2" r="1.2" fill="#f05060" />
    </svg>
  );
}

interface Props {
  className?: string;
  /** force white wordmark (for dark hero / footer bands) */
  onDark?: boolean;
  showTagline?: boolean;
}

export default function Logo({ className = "", onDark = false, showTagline = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <LogoMark className="w-9 h-9 md:w-10 md:h-10 shrink-0 drop-shadow-[0_6px_14px_rgba(196,49,122,0.35)]" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[19px] md:text-[21px] font-extrabold tracking-[-0.03em] ${onDark ? "text-white" : "text-foreground"}`}>
          REGC<span className={`font-semibold ml-1 ${onDark ? "text-gradient-hero" : "text-gradient"}`}>Digital</span>
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
