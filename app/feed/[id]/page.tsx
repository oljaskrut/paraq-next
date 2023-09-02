import XImage from "@/components/x-image"
import { formatDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

export default async function Page({ params }: { params: { id: string } }) {
  const feedItem = await prisma.feed.findFirst({
    where: {
      id: params.id,
    },
    include: {
      set: {
        select: {
          source: true,
          link: true,
        },
      },
    },
  })

  if (!feedItem) return notFound()
  return (
    <>
      <div className="group flex flex-col space-y-2 rounded-lg border shadow">
        <XImage
          url={feedItem.image}
          className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
        />
        <div className="p-4">
          <div className="flex justify-between text-sm text-muted-foreground px-2">
            <Link href={`/source/${feedItem.source}`}>
              <span>{feedItem.source}</span>
            </Link>

            <span>{formatDate(feedItem.date)}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tighter leading-6 my-2">
            {feedItem.head}
          </h2>
          <p className="text-lg md:text-xl">{feedItem.summary}</p>

          <Link href={feedItem.link} className="flex justify-end">
            <p className="underline underline-offset-2 mt-2">
              Читать на {feedItem.source}
            </p>
          </Link>

          <div className="mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {feedItem.set.map((item) => (
              <Link key={item.link} href={item.link} className="">
                <div className="text-sm text-muted-foreground px-2">
                  <span>{item.source}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
