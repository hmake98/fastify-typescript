import { FastifyInstance } from 'fastify';
import * as controllers from '../controllers'

async function userRouter(fastify: FastifyInstance, opts, next) {    
    fastify.post('/user/login', { preHandler: [] }, controllers.login)
    fastify.post('/user/signup', { preHandler: [] }, controllers.signUp)
}

export default userRouter

