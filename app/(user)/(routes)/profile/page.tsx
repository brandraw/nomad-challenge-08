import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const getUser = async (id: number) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      email: true,
    },
  });

  return user;
};

export default async function Profile() {
  const session = await getSession();
  if (!session.id) {
    redirect("/");
  }
  const user = await getUser(session.id);
  if (!user) {
    redirect("/");
  }

  return (
    <div className="p-5">
      <div className="p-4 border rounded-lg bg-blue-50/50 flex flex-col gap-2 *:text-sm">
        <span>Username : {user.username}</span>
        <span>Email : {user.email}</span>
      </div>
    </div>
  );
}
