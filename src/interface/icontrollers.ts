import { FastifyRequest, FastifyReply } from 'fastify';

export interface UserController {
    login(request: FastifyRequest, reply: FastifyReply): any
    
    signUp(request: FastifyRequest, reply: FastifyReply): any
}