import AddTweet from "@/components/add-tweet";
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
    <main className="p-5 space-y-3">
      <AddTweet />
      <div className="flex flex-col gap-2">
        {tweets.map((a, i) => (
          <Link
            href={`/tweets/${a.id}`}
            key={a.id}
            className="bg-orange-50/50 border p-5 rounded-lg shadow-sm flex items-center justify-between hover:-translate-y-1 transition"
          >
            <div>{a.tweet}</div>
            <div className="text-xs text-slate-500">{a.user.username}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
