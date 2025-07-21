// composables/useDate.ts
export const useDate = () => {
  const { $date } = useNuxtApp()

  const transferDate = (date: Date | string | null) => {
    if (!date) return ''
    return $date.toKST(date)
  }

  const transferDateFormatted = (date: Date | string | null, format?: string) => {
    if (!date) return ''
    return $date.toKSTFormatted(date, format)
  }

  return {
    transferDate,
    transferDateFormatted
  }
}
