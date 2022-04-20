
import { FastifyRequest } from 'fastify';
import { Prisma, User } from '@prisma/client';

export interface IUserRequest extends FastifyRequest {
    body: Prisma.UserCreateInput
    authUser: User
}

export interface IUserAuthToken {
    id: number;
    email: string;
}

export interface IGetPresign {
    fileName: string;
}

export interface IPutPresign {
    userId: number;
    fileName: string;
}