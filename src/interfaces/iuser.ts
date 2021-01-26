import { User } from '../models/User';
import { FastifyRequest } from 'fastify';

export interface IUserRequest extends FastifyRequest {
    body: User
    authUser: User
}

export interface IUserAuthToken {
    id: number;
    email: string;
}