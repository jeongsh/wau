// composables/useDate.ts
import { useDayjs } from "#dayjs"

export const useDate = () => {
  const dayjs = useDayjs()

  const transferDate = (date: Date | string | null) => {
    if (!date) return ''
    return dayjs.utc(date).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm')
  }

  const transferDateFormatted = (date: Date | string | null, format: string = 'YYYY-MM-DD') => {
    if (!date) return ''
    return dayjs.utc(date).tz('Asia/Seoul').format(format)
  }

  const transferDateTimeFormatted = (date: Date | string | null, format: string = 'YYYY년 MM월 dddd HH:mm:ss') => {
    if (!date) return ''
    return dayjs.utc(date).tz('Asia/Seoul').format(format)
  }

  return {
    transferDate,
    transferDateFormatted,
    transferDateTimeFormatted
  }
}
