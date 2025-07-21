import { getContacts } from '~/server/services/help/contactService'

export default defineEventHandler(async (event) => {
  try {
    const contacts = await getContacts()
    return contacts
  } catch (error) {
    console.error('Contact 목록 조회 실패:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})
