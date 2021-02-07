import { FastifyInstance } from 'fastify';
import { checkValidRequest, checkValidUser } from '../helpers/auth';
import * as controllers from '../controllers';

async function userRouter(fastify: FastifyInstance) {
    fastify.post('/user/login', { preHandler: [] }, controllers.login)

    fastify.post('/user/signup', { preHandler: [] }, controllers.signUp)

    fastify.get('/user', { preHandler: [checkValidRequest, checkValidUser] },
        controllers.getAllUsers)
}

export default userRouter

