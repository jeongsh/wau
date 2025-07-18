
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}

// 유저 데이터 조회시 사용 (db 스키마와 통일 시킴)
export interface User {
  no: number
  uuid: string
  email: string
  phoneNumber: string
  name: string
  nickname: string
  createdDt: Date | string
  updatedDt: Date | string
  modifiedDt?: Date
  deletedDt?: Date
  deletedYn: boolean
  role: UserRole
}

// 유저 생성시 호출해서 사용
export interface UserCreateDto {
  email: string
  phoneNumber: string
  name: string
  nickname: string
  password: string
  role?: UserRole
  createdDt?: Date
  updatedDt?: Date
}

// 유저 수정시 호출해서 사용
export interface UserUpdateDto {
  no: number  // 조건에 사용
  uuid?: string // 조건에 사용
  email?: string
  phoneNumber?: string
  password?: string
  name?: string
  nickname?: string
  modifiedDt: Date
  updatedDt: Date
}

export interface UserDeleteDto {
  no: number  // 조건에 사용
  uuid?: string // 조건에 사용
  deletedDt: Date
  deletedYn: boolean
}