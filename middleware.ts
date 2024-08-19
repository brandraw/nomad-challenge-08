import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

const publicRoutes = new Set([
  "/",
  "/login",
  "/signup",
  "/github/start",
  "/github/complete",
]);

export async function middleware(req: NextRequest) {
  const session = await getSession();
  const isLoggedIn = Boolean(session.id);
  const isPublic = publicRoutes.has(req.nextUrl.pathname);

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
