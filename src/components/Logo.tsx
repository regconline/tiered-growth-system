import logo from "@/assets/regc-logo.png";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

const Logo = ({ className = "h-12 w-auto", inverted = false }: LogoProps) => (
  <img
    src={logo}
    alt="REGC Digital — Healthcare Digital Marketing"
    className={`${className} ${inverted ? "brightness-0 invert" : ""}`}
    width={220}
    height={56}
    loading="eager"
  />
);

export default Logo;