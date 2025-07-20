import jwt from 'jsonwebtoken'
import { User } from '~/types/user'

export const createJwtToken = (userUuid: string) => {
  const config = useRuntimeConfig()

  return jwt.sign(
    { uuid: userUuid },
    config.jwtSecretKey,
    { expiresIn: '3d',}
  )
}
