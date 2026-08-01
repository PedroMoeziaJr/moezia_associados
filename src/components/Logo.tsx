import Link from "next/link";
import ToriiIcon from "./icons/ToriiIcon";

type LogoProps = {
  variant?: "dark" | "light";
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
};

const SIZES = {
  sm: { icon: "h-7 w-9", title: "text-lg", tagline: "text-[8px]" },
  md: { icon: "h-9 w-11", title: "text-2xl", tagline: "text-[10px]" },
  lg: { icon: "h-14 w-16", title: "text-4xl", tagline: "text-xs" },
};

/** Stacked lockup: icon on top, wordmark ("MOÉZIA" / "ASSOCIADOS") below. */
export default function Logo({ variant = "dark", showTagline = true, size = "md" }: LogoProps) {
  const textColor = variant === "dark" ? "text-moezia-dark" : "text-white";
  const subColor = variant === "dark" ? "text-moezia-dark/70" : "text-white/70";
  const s = SIZES[size];

  return (
    <Link href="/" className="inline-flex flex-col items-center gap-1 leading-none">
      <ToriiIcon className={s.icon} />
      <span className={`font-serif tracking-wide ${textColor} ${s.title}`}>MOÉZIA</span>
      {showTagline && (
        <span className={`tracking-[0.3em] ${subColor} ${s.tagline}`}>ASSOCIADOS</span>
      )}
    </Link>
  );
}
