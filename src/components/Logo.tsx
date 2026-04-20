import logo from "@/assets/regc-logo.png";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

const Logo = ({ className = "h-9 w-auto", inverted = false }: LogoProps) => (
  <img
    src={logo}
    alt="REGC Digital — Healthcare Digital Marketing"
    className={`${className} ${inverted ? "brightness-0 invert" : ""}`}
    width={180}
    height={40}
    loading="eager"
  />
);

export default Logo;