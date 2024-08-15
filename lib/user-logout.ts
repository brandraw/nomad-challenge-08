"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";

export async function UserLogout() {
  const session = await getSession();
  session.destroy();

  redirect("/");
}
