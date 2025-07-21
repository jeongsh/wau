import { selectAllNotice, getNotice, createNotice } from "~/server/repositories/help/noticeRepository"

// 조회 test api
export const getNotices = async () => {
  return await selectAllNotice()
}

export const getNoticeById = async (id: number) => {
  return await getNotice(id)
}

export const makeNotice = async (data: { title: string; content: string; pick: boolean }) => {
  return await createNotice(data)
}