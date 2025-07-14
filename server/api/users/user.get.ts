import { getUsers } from '~/server/api/users/user'
export default defineEventHandler(async () => {
  return await getUsers()
})