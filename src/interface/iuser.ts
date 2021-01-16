import { FastifyRequest } from 'fastify';
import { Prisma } from '@prisma/client';

export interface IUserRequest extends FastifyRequest {
    body: Prisma.UserCreateInput
}