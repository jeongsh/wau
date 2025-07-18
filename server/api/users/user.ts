import prisma from "~/lib/prisma"

// 조회 test api
export const getUsers = async () => {
  return await prisma.user.findMany({
    select: {
      no: true,
      uuid: true,
      email: true,
      phoneNumber: true,
      name: true,
      nickname: true,
      createdDt: true,
      modifiedDt: true,
      role: true
    },
    where: {
      deletedYn: false
    },
    orderBy: {
      createdDt: 'desc'
    }
  })
}

// 생성 test api
// export const createUser = async (userObj: any) => {
//   try {
//     const { name, email, phoneNumber, createdDt, updatedDt } = userObj

//     const result = await prisma.user.create({
//       data: { name, email, phoneNumber, createdDt, updatedDt }
//     })

//     return {success: true, code: 200, data: result}
//   }
//   catch {
//     console.error('Error creating user')
//     return {success: false, code: 500, message: 'Failed to create user'}
//   }

// }

// 수정 test api
// export const updateUser = async (no: number, name: string, email: string) => {
//   return await prisma.user.update({
//     where: { no },
//     data: { name, email }
//   })
// }
