import prisma from '~/lib/prisma'

export const selectAllContact = async () => {
  return await prisma.contact.findMany({
    select: {
      no: true,
      title: true,
      content: true,
      type: true,
      userName: true,
      userEmail: true,
      phoneNumber: true,
      answer: true,
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

export const getContact = async (id: number) => {
  return await prisma.contact.findUnique({
    where: {
      no: id
    },
    select: {
      no: true,
      title: true,
      content: true,
      type: true,
      userName: true,
      userEmail: true,
      phoneNumber: true,
      answer: true,
      createdDt: true,
      updatedDt: true,
      deletedDt: true,
      deletedYn: true
    }
  })
}

export const createContact = async (data: { 
  title: string; 
  content: string; 
  type: string; 
  userName: string; 
  userEmail: string; 
  phoneNumber?: string; 
}) => {
  return await prisma.contact.create({
    data: {
      title: data.title,
      content: data.content,
      type: data.type,
      userName: data.userName,
      userEmail: data.userEmail,
      phoneNumber: data.phoneNumber,
      deletedYn: false
    }
  })
}
