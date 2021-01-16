import { Prisma } from '@prisma/client';
import { prisma } from './index'

export const createUser = (data: Prisma.UserCreateInput) => {
    return prisma.user.create({ data });
}