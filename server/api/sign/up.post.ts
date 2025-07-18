// import { createUser }

import { createUser } from "~/server/services/sign/signService"

// 회원가입
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  createUser(body)

  return {
    status: 'success',
    message: '회원가입이 완료되었습니다.',
    code: 200
  }
})