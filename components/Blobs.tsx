type Variant = "hero" | "page" | "subtle";

export default function Blobs({ variant = "page" }: { variant?: Variant }) {
  if (variant === "hero") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden -z-0">
        <div
          className="blob blob-animate"
          style={{ top: "-6rem", right: "-8rem", width: "30rem", height: "30rem" }}
        />
        <div
          className="blob blob-soft blob-animate"
          style={{ top: "40%", left: "-10rem", width: "26rem", height: "26rem", animationDelay: "2s" }}
        />
        <div
          className="blob blob-animate"
          style={{ bottom: "-8rem", right: "10%", width: "22rem", height: "22rem", opacity: 0.45, animationDelay: "4s" }}
        />
      </div>
    );
  }
  if (variant === "subtle") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden -z-0">
        <div
          className="blob blob-soft blob-animate"
          style={{ top: "20%", right: "-12rem", width: "24rem", height: "24rem", opacity: 0.35 }}
        />
      </div>
    );
  }
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden -z-0">
      <div
        className="blob blob-soft blob-animate"
        style={{ top: "-6rem", right: "-10rem", width: "28rem", height: "28rem" }}
      />
      <div
        className="blob blob-animate"
        style={{ bottom: "-10rem", left: "-6rem", width: "22rem", height: "22rem", opacity: 0.4, animationDelay: "3s" }}
      />
    </div>
  );
}
