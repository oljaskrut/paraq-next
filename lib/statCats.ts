import { prisma } from "@/lib/prisma"

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
      take: 50,
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
