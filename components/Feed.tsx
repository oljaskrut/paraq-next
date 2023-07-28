import XImage from "@/components/x-image"
import Link from "next/link"
import { formatTime, windowDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import { Separator } from "./ui/separator"

export default async function Feed() {
  const feed = await prisma.feed.findMany({
    take: 6,
    orderBy: { length: "desc" },
    where: {
      date: {
        gte: windowDate(),
      },
      OR: [
        {
          hidden: {
            equals: null,
          },
        },
        {
          hidden: {
            equals: false,
          },
        },
      ],
    },
    select: {
      id: true,
      head: true,
      length: true,
      hash: true,
      image: true,
      source: true,
      date: true,
    },
  })
  return (
    <div className="grid gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Separator className="md:hidden" />

      {feed
        // .sort((a, b) => (b.date > a.date ? 1 : -1))
        .map((item) => (
          <>
            <Link
              href={`/group/${item.id}`}
              key={item.id}
              className="group flex flex-col md:space-y-2 rounded-lg md:border shadow"
            >
              <XImage
                url={item.image}
                className="hidden md:flex rounded-t-lg bg-muted transition-colors object-cover aspect-video"
                priority={true}
              />
              <div className="px-4 py-2 md:py-4">
                <div className="hidden md:flex justify-between text-sm text-muted-foreground px-2">
                  <Link href={`/source/${item.source}`}>
                    <span>{item.source}</span>
                  </Link>

                  <span>{formatTime(item.date)}</span>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <h2 className="flex text-lg md:text-2xl font-extrabold tracking-tighter leading-6 md:my-2">
                    {item.head}
                  </h2>
                  <span className="hidden md:flex">
                    еще {item.length} похожих
                  </span>
                </div>
              </div>
            </Link>
            <Separator className="md:hidden" />
          </>
        ))}
    </div>
  )
}
