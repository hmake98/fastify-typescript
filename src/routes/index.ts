import { FastifyInstance } from 'fastify';
import { UserController } from 'interface';
import { userControllers } from '../controllers';

async function routes(fastify: FastifyInstance, opts, next) {
    let controllers: UserController = userControllers;
    fastify.get('/login', controllers.login)
    fastify.get('/signup', controllers.signUp)
}

module.exports = routes
