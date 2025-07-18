// import { createUser }

import { createUser } from "~/server/services/sign/signService"

// 회원가입
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const result = await createUser(body)

  if (!result.status) {
    throw createError({
      statusCode: 500,
      statusMessage: `회원가입중 오류가 발생했습니다. 관리자에게 문의 바랍니다.`,
      data: result
    })
  }

  return result
})