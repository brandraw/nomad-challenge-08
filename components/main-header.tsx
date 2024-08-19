import { UserLogout } from "@/lib/user-logout";
import Link from "next/link";

export function MainHeader() {
  return (
    <header className="flex items-center justify-between bg-slate-50 p-5 text-sm">
      <Link href="/">Home</Link>
      <nav>
        <ul className="flex items-center gap-3">
          <li>
            <Link href="/private">Private</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Sign Up</Link>
          </li>
          <li>
            <form action={UserLogout}>
              <button>Log Out</button>
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}
