import { db } from "@/lib/db";
import Link from "next/link";

async function getTweets() {
  const tweets = await db.tweet.findMany({
    orderBy: {
      created_at: "desc",
    },
    select: {
      id: true,
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

  return tweets;
}

export default async function Home() {
  const tweets = await getTweets();
  if (!tweets) {
    return <div>No Data</div>;
  }

  return (
    <main className="p-5">
      <div>Tweets</div>
      <div className="flex flex-col gap-2">
        {tweets.map((a, i) => (
          <Link
            href={`/tweets/${a.id}`}
            key={a.id}
            className="border p-5 rounded-lg shadow-sm"
          >
            {a.tweet}
          </Link>
        ))}
      </div>
    </main>
  );
}
