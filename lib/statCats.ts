import { prisma } from "@/lib/prisma"
import { todayDate } from "./dayjs"

export async function statCats() {
  try {
    const res = await prisma.categoriesOnPosts.groupBy({
      by: ["categoryId"],
      _count: {
        postId: true,
      },
      orderBy: {
        _count: {
          postId: "desc",
        },
      },
      take: 20,
      where: {
        post: {
          date: {
            gte: todayDate(),
          },
        },
        categoryId: {
          notIn: [765, 774],
        },
      },
    })

    const cats = await prisma.category.findMany({
      where: {
        id: {
          in: res.map((item) => item.categoryId),
        },
      },
    })

    const data = res.map((item) => ({
      count: item._count.postId,
      category: cats.find((cat) => cat.id === item.categoryId),
    }))

    return data
  } catch (e) {
    return []
  }
}
