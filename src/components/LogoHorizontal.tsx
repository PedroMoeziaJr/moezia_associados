import Link from "next/link";
import ToriiIcon from "./icons/ToriiIcon";

type LogoHorizontalProps = {
  variant?: "dark" | "light";
  showTagline?: boolean;
  href?: string;
};

/** Horizontal lockup: icon on the left, wordmark stacked to the right - fits nav bars better than the stacked logo. */
export default function LogoHorizontal({
  variant = "dark",
  showTagline = true,
  href = "/",
}: LogoHorizontalProps) {
  const textColor = variant === "dark" ? "text-moezia-dark" : "text-white";
  const subColor = variant === "dark" ? "text-moezia-dark/70" : "text-white/70";

  return (
    <Link href={href} className="inline-flex items-center gap-2 leading-none">
      <ToriiIcon className="h-9 w-11 shrink-0" />
      <span className="flex flex-col">
        <span className={`font-serif text-xl tracking-wide ${textColor}`}>MOÉZIA</span>
        {showTagline && (
          <span className={`text-[9px] tracking-[0.3em] ${subColor}`}>ASSOCIADOS</span>
        )}
      </span>
    </Link>
  );
}
