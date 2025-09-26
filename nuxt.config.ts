// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: '와유',
      meta: [
        { name: 'description', content: 'This is a Nuxt.js application' },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
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
  },
  nitro: {
    preset: "static",
    // prerender: {
    //   routes: ["/sitemap.xml", "/robots.txt"],
    // },
  },
})