import { db } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    select: {
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  return tweet;
}

async function getPreviousTweet(id: number) {
  const previousTweet = await db.tweet.findMany({
    where: {
      id: {
        lt: id,
      },
    },
    take: 1,
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
    },
  });

  return previousTweet[0];
}
async function getNextTweet(id: number) {
  const nextTweet = await db.tweet.findMany({
    where: {
      id: {
        gt: id,
      },
    },
    take: 1,
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
    },
  });

  return nextTweet[0];
}

export default async function TweetPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  const previousTweet = await getPreviousTweet(id);
  const nextTweet = await getNextTweet(id);

  return (
    <div className="p-5 space-y-4">
      <div>
        <Link
          href={`/`}
          className="rounded-md px-3 py-2 bg-slate-100 text-sm text-slate-500"
        >
          Go Back
        </Link>
      </div>
      <div>{tweet.tweet}</div>
      <div className="flex">
        {previousTweet && (
          <Link
            href={`/tweets/${previousTweet.id}`}
            className="text-xs px-3 py-2 rounded-md bg-slate-100 text-slate-400 mr-auto"
          >
            Previous
          </Link>
        )}
        {nextTweet && (
          <Link
            href={`/tweets/${nextTweet.id}`}
            className="text-xs px-3 py-2 rounded-md bg-slate-100 text-slate-400 ml-auto"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}
