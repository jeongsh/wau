import { getFaqs } from '~/server/services/help/faqService'

export default defineEventHandler(async (event) => {
  try {
    const faqs = await getFaqs()
    return faqs
  } catch (error) {
    console.error('FAQ 목록 조회 실패:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
