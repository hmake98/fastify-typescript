import { FastifyInstance } from 'fastify';
import { checkValidRequest, checkValidUser } from '../helpers/auth';
import * as controllers from '../controllers';
import * as auth from 'fastify-auth'

async function userRouter(fastify: FastifyInstance) {
    fastify.post('/user/login', { preHandler: [] }, controllers.login)

    fastify.post('/user/signup', { preHandler: [] }, controllers.signUp)

    fastify.get('/user', {
        preHandler:
            fastify.auth([
                checkValidRequest,
                checkValidUser
            ], { relation: 'and', run: 'all' })
    },
        controllers.getAllUsers)
}

export default userRouter

