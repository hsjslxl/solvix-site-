import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Solvix">
      <Image
        src="/solvix-logo-new.png"
        alt=""
        width={764}
        height={188}
        aria-hidden="true"
        priority
      />
    </Link>
  );
}
