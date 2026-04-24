import Image from "next/image";

interface Props {
  className?: string;
  inverted?: boolean;
}

export default function Logo({ className = "h-12 w-auto", inverted = false }: Props) {
  return (
    <img
      src="/assets/regc-logo.png"
      alt="REGC Digital — Healthcare Digital Marketing"
      className={`${className} ${inverted ? "brightness-0 invert" : ""}`}
      width={220}
      height={56}
    />
  );
}
