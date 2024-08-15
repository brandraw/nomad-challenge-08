import { getSession } from "./session";

export async function UserLogin(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
}
