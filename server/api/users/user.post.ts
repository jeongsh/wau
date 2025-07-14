import { createUser } from '~/server/api/users/user'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return await createUser(body.name, body.email)
})