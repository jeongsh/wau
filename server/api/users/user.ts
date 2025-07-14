import prisma from "~/lib/prisma"

// 조회 test api
export const getUsers = async () => {
  return await prisma.user.findMany()
}

// 생성 test api
export const createUser = async (name: string, email: string) => {
  try {
    const result = await prisma.user.create({
      data: { name, email }
    })

    return {success: true, code: 200, data: result} 
  }
  catch {
    console.error('Error creating user')
    return {success: false, code: 500, message: 'Failed to create user'}
  }

}

// 수정 test api
export const updateUser = async (id: number, name: string, email: string) => {
  return await prisma.user.update({
    where: { id },
    data: { name, email }
  })
}
