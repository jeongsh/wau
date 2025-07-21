import { getFaqById, makeFaq } from '../../services/help/faqService'

export default defineEventHandler(async (event) => {
  const method = event.method?.toUpperCase()

  // GET - FAQ 상세 조회
  if (method === 'GET') {
    try {
      const query = getQuery(event)
      const no = parseInt(query.no as string)
      
      if (!no || isNaN(no)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid FAQ number'
        })
      }

      const faq = await getFaqById(no)
      
      if (!faq) {
        throw createError({
          statusCode: 404,
          statusMessage: 'FAQ not found'
        })
      }

      return faq
    } catch (error: any) {
      console.error('FAQ get error:', error)
      
      if (error.statusCode) {
        throw error
      }
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error'
      })
    }
  }

  // POST - FAQ 생성
  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      if (!body.title || !body.content) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Title and content are required'
        })
      }

      const faq = await makeFaq({
        title: body.title,
        content: body.content,
        pick: body.pick || false,
        type: body.type || 'general' // Default type if not provided
      })

      return {
        success: true,
        data: faq
      }
    } catch (error: any) {
      console.error('FAQ creation error:', error)

      if (error.statusCode) {
        throw error
      }
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error'
      })
    }
  }

  // 지원하지 않는 메서드
  throw createError({
    statusCode: 405,
    statusMessage: 'Method Not Allowed'
  })
})
