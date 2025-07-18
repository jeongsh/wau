// lib/notice.js
import prisma from "~/lib/prisma";

export const getNotices = async () => {
  try {
    return await prisma.notice.findMany({
      select: {
        no: true,
        title: true, 
        content: true,
        pick: true,
        createdDt: true,
        updatedDt: true,
        modifiedDt: true,
        deletedDt: true,
        deletedYn: true
      },
      where: {
        deletedYn: false
      },
      orderBy: {
        createdDt: 'desc'
      }
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getNotice = async (id:number) => {
  try {
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
        modifiedDt: true,
        deletedDt: true,
        deletedYn: true
      }
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};