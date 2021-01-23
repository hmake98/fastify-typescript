import { FastifyInstance } from 'fastify';
import { IUserController } from 'interfaces';
import { userControllers } from '../controllers';

export async function userRouter(fastify: FastifyInstance, opts, next) {
    let controllers: IUserController = userControllers;
    fastify.post('/user/login', { preHandler: [] }, controllers.login)
    fastify.post('/user/signup', { preHandler: [] }, controllers.signUp)
}

