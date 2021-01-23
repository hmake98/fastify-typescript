import { FastifyRequest, FastifyReply } from 'fastify';

export interface IUserController {
    login(request: FastifyRequest, reply: FastifyReply): any
    
    signUp(request: FastifyRequest, reply: FastifyReply): any
}