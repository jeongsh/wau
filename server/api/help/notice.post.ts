import { createNotice } from './notice'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    const body = await readBody(event)
    
    if (!body.title || !body.content) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Title and content are required'
      })
    }

    const notice = await createNotice({
      title: body.title,
      content: body.content,
      pick: body.pick || false
    })

    return {
      success: true,
      data: notice
    }
  } catch (error: any) {
    console.error('Notice creation error:', error)
    
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
