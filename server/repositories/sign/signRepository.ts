import { Prisma } from "@prisma/client"
import prisma from "~/lib/prisma"

export const insertUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data: data
  })
}