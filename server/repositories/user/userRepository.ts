import { Prisma } from '@prisma/client'
import prisma from '~/lib/prisma'

export const selectAllUser = async () => {
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
