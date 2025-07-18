import { getNotices } from '~/server/api/help/notice'

export default defineEventHandler(async () => {
  return await getNotices()
})