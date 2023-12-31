import FeedAll from "@/components/FeedAll"

export const dynamic = "force-dynamic"

export default async function Page() {
  return (
    <main className="md:container grid items-center gap-6 md:pb-4 pt-6">
      <h1 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl mb-2">
        Все новости
      </h1>
      <FeedAll />
    </main>
  )
}
