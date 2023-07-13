import XImage from "@/components/x-image"
import { formatDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import { formatTimeToNow } from "@/lib/utils"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
  const feedItem = await prisma.feed.findFirst({
    where: {
      id: params.id,
    },
    include: {
      set: {
        orderBy: {
          date: "desc",
        },
      },
    },
  })

  if (!feedItem) return notFound()

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-4">
        {feedItem.head}
      </h1>
      {feedItem.set.map((post) => (
        <Link
          href={`/post/${post.id}`}
          className="group flex flex-col space-y-2 rounded-lg border shadow"
        >
          <XImage
            url={post.image}
            className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
          />
          <div className="p-4">
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>{post.source}</span>

              <span>{formatTimeToNow(post.date)}</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tighter leading-6 my-2">
              {post.head}
            </h2>
          </div>
        </Link>
      ))}
    </>
  )
}
