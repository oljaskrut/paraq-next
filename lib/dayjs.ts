import dayjs from "dayjs"
import isToday from "dayjs/plugin/isToday.js"
import isYesterday from "dayjs/plugin/isYesterday.js"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(isYesterday)
dayjs.extend(isToday)
dayjs.extend(utc)
dayjs.extend(timezone)

export function windowDate() {
  const d =
    process.env.NODE_ENV === "production"
      ? dayjs()
      : dayjs().subtract(6, "hours")
  return d.subtract(8, "hours").toDate()
}

export function todayDate() {
  const d = dayjs().add(6, "hours")
  // process.env.NODE_ENV === "production"
  // ? dayjs()
  // : dayjs().subtract(6, "hours")
  return d.subtract(24, "hours").toDate()
}

export function formatDate(date: Date) {
  const d = dayjs(date)
  // process.env.NODE_ENV === "production"
  // ? dayjs()
  // : dayjs().subtract(6, "hours")
  if (d.isToday()) {
    return "Сегодня, " + d.format("HH:mm")
  }
  if (d.isYesterday()) {
    return "Вчера, " + d.format("HH:mm")
  }
  return d.format("DD.MM HH:mm")
}

export function formatTime(date: Date) {
  const d =
    process.env.NODE_ENV === "production"
      ? dayjs(date)
      : dayjs(date).subtract(6, "hours")
  return d.format("HH:mm")
}

export function formatSimple(date: Date) {
  const d =
    process.env.NODE_ENV === "production"
      ? dayjs(date)
      : dayjs(date).subtract(6, "hours")
  return d.format("DD.MM HH:mm")
}
