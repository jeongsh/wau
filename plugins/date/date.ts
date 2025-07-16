import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export default defineNuxtPlugin((nuxtApp) => {
  // 기본적으로 Asia/Seoul로 변환
  const toKST = (utcDate: string | Date): string => {
    return dayjs.utc(utcDate).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm')
  }

  // 포맷 옵션도 허용
  const toKSTFormatted = (utcDate: string | Date, format: string = 'YYYY-MM-DD HH:mm'): string => {
    return dayjs.utc(utcDate).tz('Asia/Seoul').format(format)
  }

  nuxtApp.provide('date', {
    toKST,
    toKSTFormatted
  })
})