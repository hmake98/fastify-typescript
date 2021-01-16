import { userControllers } from '../controllers';

export const routes = (fastify, options) => {
    fastify.get('/login', userControllers.login)
    fastify.get('/signup', userControllers.signUp)
}
