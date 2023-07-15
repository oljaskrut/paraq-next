import { todayDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function Home() {
  const sources = await prisma.post.groupBy({
    by: ["source"],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
    where: {
      date: {
        gte: todayDate(),
      },
    },
  })

  return (
    <main className="md:container grid items-center gap-6 md:pb-4 pt-6">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-2">
        Источники сегодня
      </h1>

      {sources.map(
        ({ _count, source }) =>
          source && (
            <Link href={`/source/${source}`}>
              <span className="font-bold">{_count.id}</span> {source}
            </Link>
          ),
      )}
    </main>
  )
}
