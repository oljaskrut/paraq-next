import dayjs from "dayjs"
import isToday from "dayjs/plugin/isToday.js"
import isYesterday from "dayjs/plugin/isYesterday.js"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(isYesterday)
dayjs.extend(isToday)
dayjs.extend(utc)
dayjs.extend(timezone)

export function todayDate() {
  return dayjs().subtract(18, "hours").toDate()
}

export function formatDate(date: Date) {
  const d = dayjs(date).subtract(6, "hours")
  if (d.isToday()) {
    return "Сегодня, " + d.format("HH:mm")
  }
  if (d.isYesterday()) {
    return "Вчера, " + d.format("HH:mm")
  }
  return d.format("DD.MM HH:mm")
}

export function formatTime(date: Date) {
  const d = dayjs(date).subtract(6, "hours")
  return d.format("HH:mm")
}

export function formatSimple(date: Date) {
  const d = dayjs(date).subtract(6, "hours")
  return d.format("DD.MM HH:mm")
}
