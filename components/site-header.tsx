import Link from "next/link"
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block text-xl font-extrabold">
              {siteConfig.name}
            </span>
          </Link>
          <nav className="flex gap-6">
            {siteConfig.mainNav?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center text-sm font-medium text-muted-foreground"
                  >
                    {item.title}
                  </Link>
                ),
            )}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4"></div>
      </div>
    </header>
  )
}

/* <Link href={siteConfig.links.instagram} target="_blank" rel="noreferrer">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </div>
            </Link>
            <Link href={siteConfig.links.telegram} target="_blank" rel="noreferrer">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.telegram className="h-5 w-5 fill-current" />
                <span className="sr-only">Telegram</span>
              </div>
            </Link> */
