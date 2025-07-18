// types/nuxt.d.ts
declare module '#app' {
  interface NuxtApp {
    $date: {
      toKST: (utcDate: string | Date) => string
      toKSTFormatted: (utcDate: string | Date, format?: string) => string
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $date: {
      toKST: (utcDate: string | Date) => string
      toKSTFormatted: (utcDate: string | Date, format?: string) => string
    }
  }
}

export {}
