// import { createUser } from '~/server/services/user/userService'

// export default defineEventHandler(async (event) => {
//   const body = await readBody(event)

//   // kst생성 
//   const nowDate = new Date()

//   const userObj = {
//     name: body.name,
//     email: body.email,
//     phoneNumber: body.phoneNumber,
//     createdDt: nowDate,
//     updatedDt: nowDate,
//   }

//   return await createUser(userObj)
// })