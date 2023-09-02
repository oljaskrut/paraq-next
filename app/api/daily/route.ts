import { formatDate, formatTime, todayDate, windowDate } from "@/lib/dayjs"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 5

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = +(searchParams.get("limit") || "10")
  const compact = Boolean(searchParams.get("compact")) || false

  const data = await prisma.feed.findMany({
    take: limit,
    orderBy: {
      // length: "desc",
      date: "asc",
    },
    where: {
      date: {
        gte: todayDate(),
      },
      AND: {
        isSummarized: true,
      },
    },
    ...(compact && {
      select: {
        date: true,
        length: true,
        summary: true,
        source: true,
      },
    }),
  })

  const mod = compact
    ? data.map(
        (item) =>
          item.source +
          "-(" +
          formatTime(item.date) +
          "):" +
          item.summary +
          ` (quoted ${item.length} times)`,
      )
    : data

  const from = todayDate()
  const time = new Date().toLocaleTimeString("ru-RU")
  return NextResponse.json({ from, time, mod })
}
