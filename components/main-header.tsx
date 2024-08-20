import { getSession } from "@/lib/session";
import Link from "next/link";
import MainNav from "./main-nav";

export async function MainHeader() {
  const session = await getSession();
  const isLoggedIn = Boolean(session.id);

  return (
    <header className="flex items-center justify-between bg-slate-50 p-5 text-sm">
      <Link href="/">Home</Link>
      <MainNav isLoggedIn={isLoggedIn} />
    </header>
  );
}
