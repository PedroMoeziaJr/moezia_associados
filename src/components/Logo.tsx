import Image from "next/image";
import Link from "next/link";

const NATURAL_WIDTH = 285;
const NATURAL_HEIGHT = 241;

type LogoProps = {
  href?: string;
  height?: number;
  /** Wraps the logo in a white card so the dark wordmark stays legible on dark backgrounds. */
  onDark?: boolean;
};

/** Real Moézia Associados logo artwork (public/logo.png) - icon + wordmark + tagline. */
export default function Logo({ href = "/", height = 56, onDark = false }: LogoProps) {
  const width = Math.round((height * NATURAL_WIDTH) / NATURAL_HEIGHT);

  const image = (
    <Image
      src="/logo.png"
      alt="Moézia Associados - Advocacia e Assessoria Jurídica"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      priority
    />
  );

  if (!onDark) {
    return <Link href={href}>{image}</Link>;
  }

  return (
    <Link href={href} className="inline-flex rounded-lg bg-white px-3 py-1.5 shadow-sm">
      {image}
    </Link>
  );
}
