import prisma from '~/lib/prisma'

export const selectAllNotice = async () => {
  return await prisma.notice.findMany({
    select: {
      no: true,
      title: true,
      content: true,
      pick: true,
      createdDt: true,
      updatedDt: true,
      deletedDt: true,
      deletedYn: true
    },
    where: {
      deletedYn: false
    },
    orderBy: {
      createdDt: 'desc'
    }
  })
}

export const getNotice = async (id: number) => {
  return await prisma.notice.findUnique({
    where: {
      no: id
    },
    select: {
      no: true,
      title: true,
      content: true,
      pick: true,
      createdDt: true,
      updatedDt: true,
      deletedDt: true,
      deletedYn: true
    }
  })
}

export const createNotice = async (data: { title: string; content: string; pick: boolean }) => {
  return await prisma.notice.create({
    data: {
      title: data.title,
      content: data.content,
      pick: data.pick,
      createdDt: new Date(),
      updatedDt: new Date(),
      deletedYn: false
    }
  })
}