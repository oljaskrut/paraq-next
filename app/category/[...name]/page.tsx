import XImage from "@/components/x-image"
import { formatDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { name: string[] } }) {
  const name = "/" + params.name.map(decodeURI).join("/").replaceAll("%26", "&")
  const posts = await prisma.categoriesOnPosts.findMany({
    where: {
      category: {
        name,
      },
    },
    include: {
      post: true,
      category: true,
    },
    orderBy: {
      post: {
        date: "desc",
      },
    },
    take: 20,
  })

  if (posts.length === 0) return notFound()

  return (
    <>
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-4">
        {posts[0].category.short_}
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(({ post }) => (
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

                <span>{formatDate(post.date)}</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tighter leading-6 my-2">
                {post.head}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
