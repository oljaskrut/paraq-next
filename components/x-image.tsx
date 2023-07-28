"use client"
import Image from "next/image"
import { useState } from "react"

export default function XImage({
  url,
  className,
  priority,
}: {
  url: string
  className: string
  priority?: boolean
}) {
  const [error, setError] = useState(false)

  return (
    <Image
      src={error ? "/blur.webp" : url.length === 0 ? "/placeholder.webp" : url}
      onError={() => setError(true)}
      placeholder="blur"
      blurDataURL="/blur.webp"
      alt=""
      width={804}
      height={452}
      className={className}
      unoptimized={true}
      priority={priority}
    />
  )
}
