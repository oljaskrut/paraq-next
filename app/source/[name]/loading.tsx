import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export default function loading() {
  return (
    <>
      <Skeleton className="w-1/2 h-8" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((el) => (
          <article className="group flex flex-col space-y-2 rounded-lg border shadow w-full">
            <Skeleton className="rounded-t-lg bg-muted transition-colors object-cover aspect-video w-72 h-48 md:w-96 md:h-64" />
            <div className="p-4">
              <p className="text-sm text-muted-foreground text-justify w-full">
                <Skeleton className="w-full h-4" />
              </p>

              <Skeleton className="w-11/12 mt-2 mx-auto h-4" />
              <Skeleton className="w-10/12 mt-2 mx-auto h-4" />
              <Skeleton className="w-11/12 mt-2 mx-auto h-4" />
              <Skeleton className="w-10/12 mt-2 mx-auto h-4" />

              <p className="text-sm text-muted-foreground ">
                {[0, 1, 2].map((el) => (
                  <Skeleton className="w-1/2 my-2" key={el} />
                ))}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
