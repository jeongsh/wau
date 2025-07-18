import { getUsers } from '~/server/services/user/userService'

export default defineEventHandler(async () => {
  return await getUsers()
})