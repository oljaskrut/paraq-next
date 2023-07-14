import XImage from "@/components/x-image"
import { formatDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
  const feedItem = await prisma.feed.findFirst({
    where: {
      id: params.id,
    },
    select: {
      set: {
        orderBy: {
          date: "desc",
        },
      },
    },
  })

  if (!feedItem) return notFound()
  const [first, ...rest] = feedItem.set

  return (
    <>
      <Link
        href={`/post/${first.id}`}
        className="group flex flex-col space-y-2 rounded-lg border shadow"
      >
        <XImage
          url={first.image}
          className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
        />
        <div className="p-4">
          <div className="flex justify-between text-sm text-muted-foreground px-2">
            <span>{first.source}</span>

            <span>{formatDate(first.date)}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tighter leading-6 my-2">
            {first.head}
          </h2>
          <p className="text-lg md:text-xl">{first.body}</p>

          <Link href={first.link} className="flex justify-end">
            <p className="underline underline-offset-2 mt-2">
              Читать на {first.source}
            </p>
          </Link>
        </div>
      </Link>
      <div className="grid md:grid-cols-2 gap-2">
        {rest.map((item) => (
          <Link
            key={item.id}
            href={`/post/${item.id}`}
            className="group flex flex-col space-y-2 rounded-lg border shadow"
          >
            <div className="p-4">
              <div className="flex justify-between text-sm text-muted-foreground px-2">
                <span>{item.source}</span>

                <span>{formatDate(item.date)}</span>
              </div>
              <h2 className="text-xl font-bold tracking-tighter leading-6 my-2">
                {item.head}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
