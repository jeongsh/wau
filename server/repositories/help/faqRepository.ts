import prisma from '~/lib/prisma'

export const selectAllFaq = async () => {
  return await prisma.faq.findMany({
    select: {
      no: true,
      title: true,
      content: true,
      pick: true,
      type: true,
      createdDt: true,
      updatedDt: true,
      deletedDt: true,
      deletedYn: true
    },
    where: {
      deletedYn: false
    },
    orderBy: [
      { pick: 'desc' },  // 중요 FAQ 먼저
      { updatedDt: 'desc' }  // 최신순
    ]
  })
}

export const getFaq = async (id: number) => {
  return await prisma.faq.findUnique({
    where: {
      no: id
    },
    select: {
      no: true,
      title: true,
      content: true,
      pick: true,
      type: true,
      createdDt: true,
      updatedDt: true,
      deletedDt: true,
      deletedYn: true
    }
  })
}

export const createFaq = async (data: { title: string; content: string; pick: boolean; type: string }) => {
  return await prisma.faq.create({
    data: {
      title: data.title,
      content: data.content,
      pick: data.pick,
      type: data.type,
      deletedYn: false
    }
  })
}