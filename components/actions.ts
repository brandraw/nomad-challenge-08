"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const schema = z.object({
  tweet: z.string().min(1),
});

export async function handleAddTweet(_: any, formData: FormData) {
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

export async function likeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {}
}

export async function disLikeTweet(tweetId: number) {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (error) {}
}
