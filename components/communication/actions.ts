"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  comment: z.string().min(1),
});

export async function handleComment(formData: FormData, tweetId: number) {
  const data = {
    comment: formData.get("comment"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();
  const comment = await db.comment.create({
    data: {
      tweetId,
      payload: result.data.comment,
      userId: session.id!,
    },
    select: {
      tweetId: true,
    },
  });
  revalidateTag(`comments-${comment.tweetId}`);
}
