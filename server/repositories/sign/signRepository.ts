import { Prisma } from "@prisma/client"
import prisma from "~/lib/prisma"

export const insertUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: data,
    select: {
      no: true,
      uuid: true,
      email: true,
      phoneNumber: true,
      name: true,
      nickname: true,
      createdDt: true,
      role: true,
    }
  })
}