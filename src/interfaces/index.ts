
import { FastifyRequest } from 'fastify';
import { Prisma, User } from '@prisma/client';

export interface IFile {
    originalFilename: string;
    path: string;
    type: string;
}

export interface IUserRequest extends FastifyRequest {
    body: Prisma.UserCreateInput
    authUser: User
}

export interface IUserAuthToken {
    id: number;
    email: string;
}