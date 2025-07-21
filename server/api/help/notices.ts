import { getNotices } from '~/server/services/help/noticeService'

export default defineEventHandler(async (event) => {
  try {
    return await getNotices()
  } catch (error: any) {
    console.error('Notices list error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
