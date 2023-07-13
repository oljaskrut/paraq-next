import XImage from "@/components/x-image"
import { cn, formatTimeToNow } from "@/lib/utils"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function FeedAll() {
  const feed = await prisma.feed.findMany({
    take: 20,
    orderBy: { date: "desc" },
  })

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {feed.map((item) => (
        <Link
          href={item.length > 2 ? `/group/${item.id}` : `/post/${item.hash}`}
          key={item.id}
          className={cn(
            "group flex flex-col space-y-2 rounded-lg border shadow",
            item.length > 2 && "shadow-cyan-500 shadow-md",
          )}
        >
          <XImage
            url={item.image}
            className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
          />
          <div className="p-4">
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>{item.source}</span>

              <span>{formatTimeToNow(item.date)}</span>
            </div>

            <div className="flex flex-col items-end justify-between">
              <h2 className="flex text-2xl font-extrabold tracking-tighter leading-6 my-2">
                {item.head}
              </h2>

              {item.length > 2 && <span>еще {item.length} похожих</span>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
