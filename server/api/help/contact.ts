import { getContactById, makeContact, updateAnswer } from '~/server/services/help/contactService'

export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  // GET - 문의 상세 조회
  if (method === 'GET') {
    try {
      const query = getQuery(event)
      const no = parseInt(query.no as string)
      
      if (!no || isNaN(no)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid contact number'
        })
      }

      const contact = await getContactById(no)
      
      if (!contact) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Contact not found'
        })
      }

      return contact
    } catch (error: any) {
      console.error('Contact get error:', error)
      
      if (error.statusCode) {
        throw error
      }
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error'
      })
    }
  }

  // POST - 문의 생성
  if (method === 'POST') {
    try {
      const body = await readBody(event)
      
      if (!body.title || !body.content || !body.userName || !body.userEmail) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Title, content, userName, and userEmail are required'
        })
      }

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(body.userEmail)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid email format'
        })
      }

      const contact = await makeContact({
        title: body.title,
        content: body.content,
        type: body.type || 'general',
        userName: body.userName,
        userEmail: body.userEmail,
        phoneNumber: body.phoneNumber
      })

      return {
        success: true,
        data: contact
      }
    } catch (error: any) {
      console.error('Contact creation error:', error)

      if (error.statusCode) {
        throw error
      }
      
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error'
      })
    }
  }

  // PATCH - 답변 업데이트
  if (method === 'PATCH') {
    try {
      const body = await readBody(event)
      const query = getQuery(event)
      const contactNo = parseInt(query.no as string)

      if (isNaN(contactNo)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid contact number'
        })
      }

      if (!body.answer) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Answer is required'
        })
      }

      const updatedContact = await updateAnswer(contactNo, body.answer)
      
      return {
        success: true,
        message: 'Answer updated successfully',
        contact: updatedContact
      }
    } catch (error: any) {
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
