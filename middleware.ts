import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const publicRoutes = new Set([
  "/",
  "/log-in",
  "/create-account",
  "/github/start",
  "/github/complete",
]);

const onlyLogoutRoutes = new Set([
  "/log-in",
  "/create-account",
  "/github/start",
  "/github/complete",
]);

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const isLoggedIn = Boolean(session.id);
  const isPublic = publicRoutes.has(req.nextUrl.pathname);
  const isLogoutRoute = onlyLogoutRoutes.has(req.nextUrl.pathname);

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isLoggedIn && isLogoutRoute) {
    return NextResponse.redirect(new URL("profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
