
import { FastifyRequest, FastifyInstance, preHandlerHookHandler } from 'fastify';
import { Prisma, User } from '@prisma/client';
import { FastifyAuthFunction } from 'fastify-auth';

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