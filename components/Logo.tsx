import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Solvix">
      <span className="logo-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span className="logo-word">Solvix</span>
    </Link>
  );
}
