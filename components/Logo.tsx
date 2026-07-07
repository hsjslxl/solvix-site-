import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Solvix">
      <img className="logo-image" src="/solvix-logo-wordmark.png" alt="" aria-hidden="true" />
    </Link>
  );
}
