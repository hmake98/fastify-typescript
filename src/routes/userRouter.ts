import { FastifyInstance } from 'fastify';
import { UserController } from 'interface';
import { userControllers } from '../controllers';

export async function userRouter(fastify: FastifyInstance, opts, next) {
    let controllers: UserController = userControllers;

    fastify.post('/user/login', controllers.login)

    fastify.post('/user/signup', controllers.signUp)
}

