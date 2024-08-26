"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  tweet: z.string().min(1),
});

export async function handleAddTweet(_: any, formData: FormData) {
  await new Promise((r) => setTimeout(r, 500));

  const data = {
    tweet: formData.get("tweet"),
  };

  const result = schema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();

  const tweet = await db.tweet.create({
    data: {
      tweet: result.data.tweet,
      userId: session.id!,
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/");
}
