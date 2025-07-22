// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
  modules: [
    '@pinia/nuxt',
    'nuxt-tiptap-editor',
    '@formkit/auto-animate/nuxt',
    'nuxt-swiper',
    'dayjs-nuxt'
  ],
  //scss
  css: [
    '@/assets/scss/common.scss'
  ],
  tiptap: {
    prefix: 'Tiptap',
  },
  dayjs: {
    locales: ['ko', 'en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'ko',
    defaultTimezone: 'Asia/Seoul'
  }
})