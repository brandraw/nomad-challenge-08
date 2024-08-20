"use client";

import { UserLogout } from "@/lib/user-logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

const publicRoutes = [
  {
    label: "Login",
    href: "/log-in",
  },
  {
    label: "Sign Up",
    href: "/create-account",
  },
];
const privateRoutes = [
  {
    label: "Profile",
    href: "/profile",
  },
];

interface navProps {
  isLoggedIn: Boolean;
}

export default function MainNav({ isLoggedIn }: navProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-3">
        {!isLoggedIn &&
          publicRoutes.map((a, i) => (
            <li key={i}>
              <Link
                href={a.href}
                className={`${a.href === pathname ? "text-blue-600" : ""}`}
              >
                {a.label}
              </Link>
            </li>
          ))}

        {isLoggedIn && (
          <>
            {privateRoutes.map((a, i) => (
              <li key={i}>
                <Link
                  href={a.href}
                  className={`${a.href === pathname ? "text-blue-600" : ""}`}
                >
                  {a.label}
                </Link>
              </li>
            ))}
            <li>
              <form action={UserLogout}>
                <button>Log Out</button>
              </form>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
