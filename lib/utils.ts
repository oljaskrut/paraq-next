import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict, subHours } from "date-fns"
import locale from "date-fns/locale/ru"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formatDistanceLocale = {
  lessThanXSeconds: "сейчас",
  xSeconds: "сейчас",
  halfAMinute: "сейчас",
  lessThanXMinutes: "{{count}}м",
  xMinutes: "{{count}}м",
  aboutXHours: "{{count}}ч",
  xHours: "{{count}}ч",
  xDays: "{{count}}д",
  aboutXWeeks: "{{count}}н",
  xWeeks: "{{count}}н",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result
    } else {
      if (result === "just now") return result
      return result + " назад"
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(subHours(date, 6), {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}
