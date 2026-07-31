import Link from "next/link";

type LogoProps = {
  variant?: "dark" | "light";
  showTagline?: boolean;
};

/**
 * Placeholder logo (torii gate + wordmark) until the final logo files
 * (see Arte Logo Moezia Associados/) are dropped into /public/logo.svg.
 */
export default function Logo({ variant = "dark", showTagline = true }: LogoProps) {
  const textColor = variant === "dark" ? "text-moezia-dark" : "text-white";
  const subColor = variant === "dark" ? "text-moezia-dark/70" : "text-white/70";

  return (
    <Link href="/" className="inline-flex flex-col items-center gap-1 leading-none">
      <svg width="56" height="34" viewBox="0 0 200 120" aria-hidden="true">
        <path
          d="M20 30 Q100 -10 180 30"
          fill="none"
          stroke="#a3282f"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <rect x="30" y="28" width="12" height="70" fill="#a3282f" />
        <rect x="94" y="28" width="12" height="70" fill="#a3282f" />
        <rect x="158" y="28" width="12" height="70" fill="#a3282f" />
        <path d="M0 105 Q100 75 200 105" fill="none" stroke="#a3282f" strokeWidth="4" />
      </svg>
      <span className={`font-serif text-2xl tracking-wide ${textColor}`}>MOÉZIA</span>
      {showTagline && (
        <span className={`text-[10px] tracking-[0.3em] ${subColor}`}>ASSOCIADOS</span>
      )}
    </Link>
  );
}
