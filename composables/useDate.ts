// composables/useDate.ts
import { useDayjs } from "#dayjs"

export const useDate = () => {
  const dayjs = useDayjs()

  const transferDate = (date: Date | string | null) => {
    if (!date) return ''
    return dayjs.utc(date).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
  }

  const transferDateFormatted = (date: Date | string | null, format?: string) => {
    if (!date) return ''
    return dayjs.utc(date).tz('Asia/Seoul').format(format)
  }

  return {
    transferDate,
    transferDateFormatted
  }
}
