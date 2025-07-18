import { insertUser } from "~/server/repositories/sign/signRepository"
import { UserCreateDto } from "~/types/user"
import { hashPassword } from "~/server/utils/auth"

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