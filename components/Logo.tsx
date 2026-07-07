import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Solvix">
      <Image
        className="logo-image"
        src="/solvix-logo-wordmark.png"
        alt=""
        width={512}
        height={512}
        priority
        aria-hidden="true"
      />
    </Link>
  );
}
