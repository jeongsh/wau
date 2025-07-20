import { insertUser, selectOneUniqueUser } from "~/server/repositories/sign/signRepository"
import { User, UserCreateDto } from "~/types/user"
import { hashPassword, comparePassword } from "~/server/utils/auth"
import { createJwtToken } from "~/server/utils/auth/jwt"

export const createUser = async (userObj: UserCreateDto) => {
  try {

    const userDto: UserCreateDto = {...userObj}

    // TODO: 백엔드에서 데이터 한번 더 valid 로직 추가하기

    // 비밀번호 암호화
    const pw = userDto.password
    userDto.password = await hashPassword(pw)

    const prismaData = mapCreateDtoToPrisma(userDto)
    const result = await insertUser(prismaData)

    return {
      status: true,
      message: 'Success to create user',
      user: result,
    }
  }
  catch {
    console.error('Faild to create user error code 500 데이터베이스 유니크 키 무결성 확인')
    return {
      status: false,
      message: 'Failed to create user'
    }
  }
}

export const userLogin = async (event: any, email: string, password: string) => {
  const user = await selectOneUniqueUser(email)
  if (!user) {
    return {
      status: false,
      code: 401,
      message: `등록된 이메일이 없습니다.`
    }
  }

  const isMatch = await comparePassword(password, user.password)
  if (!isMatch) {
    return {
      status: false,
      code: 401,
      message: `비밀번호가 일치하지 않습니다.`
    }
  }

  // JWT 생성
  try {
    const token = createJwtToken(user.uuid)

    setCookie(event, 'access_token', token, {
      httpOnly: true,
      sameSite: 'strict', // 크로스 사이트 요청시 쿠키전송여부 - strict: 절대 전송 안함, lax: 일반적 링크/ get요청엔 전송, none: 제약없음
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 3, // 3일
      path: '/',
    })
  } catch (error) {
    console.error(`jwt토큰 생성중 에러 발생: ${error}`)
    return {
      status: false,
      code: 500,
      message: '로그인중 에러가 발생했습니다. 관리자에게 문의바랍니다.'
    }
  }

  return {
    status: true,
    code: 200,
    message: 'Login success'
  }
}