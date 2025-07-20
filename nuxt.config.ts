// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
  modules: [
    '@pinia/nuxt'
    // '@prisma/nuxt',
  ],
  //scss
  css: [
    '@/assets/scss/common.scss'
  ],
})
