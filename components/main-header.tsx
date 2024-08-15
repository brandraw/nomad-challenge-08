import Link from "next/link";

export function MainHeader() {
  return (
    <header className="flex items-center justify-between bg-slate-50 p-5 text-sm">
      <Link href="/">Home</Link>
      <nav>
        <ul className="flex items-center gap-3">
          <li>
            <Link href="/">Menu01</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
