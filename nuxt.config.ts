// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
  modules: [// '@prisma/nuxt',
  '@pinia/nuxt', 'nuxt-tiptap-editor', '@formkit/auto-animate/nuxt', 'nuxt-swiper'],
  //scss
  css: [
    '@/assets/scss/common.scss'
  ],
  tiptap: {
    prefix: 'Tiptap',
  },
})