import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Solvix">
      <span className="logo-wordmark" aria-hidden="true">
        <span className="logo-word-main">Solvi</span>
        <span className="logo-x">
          <span className="logo-x-silver" />
          <span className="logo-x-gold" />
        </span>
      </span>
    </Link>
  );
}
