// plugins/date.ts
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// dayjs 플러그인 확장은 딱 한 번만 (전역에서)
dayjs.extend(utc)
dayjs.extend(timezone)

export default defineNuxtPlugin((nuxtApp) => {
  // 기본 포맷: KST로 변환
  const toKST = (utcDate: string | Date): string => {
    return dayjs.utc(utcDate).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm')
  }

  // 사용자 지정 포맷 지원
  const toKSTFormatted = (utcDate: string | Date, format = 'YYYY-MM-DD HH:mm'): string => {
    return dayjs.utc(utcDate).tz('Asia/Seoul').format(format)
  }

  // Nuxt에 $date로 주입
  nuxtApp.provide('date', {
    toKST,
    toKSTFormatted
  })
})
