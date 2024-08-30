import { Communication } from "@/components/communication";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";
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

function getCachedLikeStatus(tweetId: number, userId: number) {
  const cache = nextCache(getLikeStatus, ["like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cache(tweetId, userId);
}
async function getLikeStatus(tweetId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        tweetId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      tweetId,
    },
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

const getCachedComments = async (tweetId: number) => {
  const cache = nextCache(getComments, ["comments"], {
    tags: [`comments-${tweetId}`],
  });
  return cache(tweetId);
};
const getComments = async (tweetId: number) => {
  const comments = await db.comment.findMany({
    where: {
      tweetId,
    },
    orderBy: {
      created_at: "desc",
    },
    select: {
      payload: true,
      user: {
        select: {
          username: true,
        },
      },
      created_at: true,
    },
  });
  return comments;
};

const getUsername = async (userId: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });
  return user!.username;
};

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

  const session = await getSession();

  const previousTweet = await getPreviousTweet(id);
  const nextTweet = await getNextTweet(id);

  const likeStatus = await getCachedLikeStatus(id, session.id!);
  const comments = await getCachedComments(id);

  const username = await getUsername(session.id!);

  return (
    <div className="p-5 space-y-6">
      <div>
        <Link
          href={`/`}
          className="rounded-md px-3 py-2 bg-slate-100 text-sm text-slate-500"
        >
          Go Back
        </Link>
      </div>

      <div className="border-t border-b py-4 leading-7">{tweet.tweet}</div>

      <div className="flex items-center">
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

      <Communication
        tweetId={id}
        likeStatus={likeStatus}
        comments={comments}
        username={username}
      />
    </div>
  );
}
