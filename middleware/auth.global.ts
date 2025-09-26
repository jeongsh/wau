
export default defineNuxtRouteMiddleware((to, from) => {
  // const token = useCookie('access_token')?.value
  // const isDev = process.env.NODE_ENV === 'development'

  // if (isDev) return

  // // 제외할 경로 설정
  // const excludedRoutes = [
  //   '/',
  //   '/login',
  // ]
  // if (excludedRoutes.includes(to.path)) return

  // // 토큰 없으면 로그인 페이지로 리다이렉트
  // if (!token) {
  //   return navigateTo('/dev/sign/login')
  //   // return navigateTo('/login')
  // }
})
