import { UserRole, UserCreateDto, UserUpdateDto, UserDeleteDto } from "~/types/user";
import { Prisma } from "@prisma/client";

export const mapCreateDtoToPrisma = (dto: UserCreateDto): Prisma.UserCreateInput => {
  return {
    email: dto.email,
    phoneNumber: dto.phoneNumber,
    name: dto.name,
    nickname: dto.nickname,
    password: dto.password,
    role: UserRole.USER,
    createdDt: new Date(),
    updatedDt: new Date()
  }
}

export const mapUpdateDtoToPrisma = (dto: UserUpdateDto): Prisma.UserUpdateInput => {
  const data: Prisma.UserUpdateInput = {
    modifiedDt: new Date(),
    updatedDt: new Date()
  };

  if (dto.email) data.email = dto.email;
  if (dto.phoneNumber) data.phoneNumber = dto.phoneNumber;
  if (dto.name) data.name = dto.name;
  if (dto.nickname) data.nickname = dto.nickname;

  return data;
}

export const mapDeleteDtoToPrisma = (dto: UserDeleteDto): Prisma.UserUpdateInput => {
  return {
    deletedDt: new Date(),
    deletedYn: true
  }
}
