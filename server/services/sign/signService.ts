import { insertUser } from "~/server/repositories/sign/signRepository"
import { UserCreateDto } from "~/types/user"

// 생성 test api
export const createUser = async (userObj: UserCreateDto) => {
  try {

    console.log(userObj)

    const prismaData = mapCreateDtoToPrisma(userObj)
    return await insertUser(prismaData)
  }
  catch {
    console.error('Error creating user')
    return {success: false, code: 500, message: 'Failed to create user'}
  }

}