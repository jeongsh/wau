// 로그인

import { userLogin } from "~/server/services/sign/signService"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const result = await userLogin(event, email, password)

  if (!result.status) {
    throw createError({
      statusCode: result.code,
      statusMessage: result.message
    })
  }

  return result
})