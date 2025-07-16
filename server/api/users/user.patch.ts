import { updateUser } from '~/server/api/users/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await updateUser(body.no, body.name, body.email)
})