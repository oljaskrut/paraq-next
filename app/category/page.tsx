import { statCats } from "@/lib/statCats"
import Link from "next/link"

export default async function Home() {
  const pcats = await statCats()

  return (
    <main className="md:container grid items-center gap-6 md:pb-4 pt-6">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-2">
        Популярные категории
      </h1>

      {pcats.map(
        (cat) =>
          cat.category && (
            <Link href={`/category${encodeURI(cat.category.name)}`}>
              <span className="font-bold">{cat.count}</span>
              {cat.category.short_}
            </Link>
          ),
      )}
    </main>
  )
}
