import XImage from "@/components/x-image"
import { formatDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Metadata } from "next"

export const dynamic = "force-static"

type Props = { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await prisma.post.findFirst({
    where: {
      OR: [{ id: params.id }, { hash: params.id }],
    },
    select: {
      head: true,
      image: true,
    },
  })

  return {
    title: post?.head,
    openGraph: {
      images: ["/open-graph.png"],
    },
  }
}

export default async function Page({ params }: Props) {
  const post = await prisma.post.findFirst({
    where: {
      OR: [{ id: params.id }, { hash: params.id }],
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  })

  if (!post) return notFound()

  return (
    <article className="group flex flex-col space-y-2 rounded-lg border shadow">
      <XImage
        url={post.image}
        className="rounded-t-lg bg-muted transition-colors object-cover aspect-video"
      />
      <div className="p-4">
        <div className="flex justify-between text-sm text-muted-foreground px-2">
          <span>{post.source}</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold tracking-tighter leading-6 my-2">
          {post.head}
        </h2>
        <p className="text-lg md:text-xl whitespace-pre-wrap">{post.body}</p>
        <Link href={post.link} className="flex justify-end">
          <p className="underline underline-offset-2 mt-2">
            Читать на {post.source}
          </p>
        </Link>
        <div className="mt-4 w-full h-[0.5px] bg-slate-400" />
        <div>
          {post.categories
            .filter(
              ({ confidence, category }) =>
                confidence >= 0.2 &&
                !["/News/Local News", "/News/Other"].includes(category.name),
            )
            .map(({ category: { short_, name } }) => (
              <Link
                href={`/category${encodeURI(name)}`}
                key={post.id + "_" + name}
                className="text-slate-400"
              >
                #{short_}{" "}
              </Link>
            ))}
        </div>
      </div>
    </article>
  )
}
