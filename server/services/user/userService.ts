import prisma from "~/lib/prisma"
import { selectAllUser } from "~/server/repositories/user/userRepository"
import { mapCreateDtoToPrisma } from "~/server/utils/userMapper"
import { UserCreateDto } from "~/types/user"

// 조회 test api
export const getUsers = async () => {
  return await selectAllUser()
}

// // 생성 test api
// export const createUser = async (userObj: UserCreateDto) => {
//   try {
//     const prismaData = mapCreateDtoToPrisma(userObj)
//     return await insertUser(prismaData)
//   }
//   catch {
//     console.error('Error creating user')
//     return {success: false, code: 500, message: 'Failed to create user'}
//   }

// }

// // 수정 test api
// export const updateUser = async (no: number, name: string, email: string) => {
//   return await prisma.user.update({
//     where: { no },
//     data: { name, email }
//   })
// }
