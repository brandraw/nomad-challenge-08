import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface Session {
  id?: number;
}

export function getSession() {
  return getIronSession<Session>(cookies(), {
    cookieName: "Good Cookies",
    password: process.env.COOKIE_PASSWORD!,
    ttl: 60 * 60,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
