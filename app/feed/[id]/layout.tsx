export default function PostLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="grid items-center justify-center max-w-3xl gap-4">
        {children}
      </div>
    </main>
  )
}
