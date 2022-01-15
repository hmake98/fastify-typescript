import { FastifyInstance } from 'fastify'
import * as controllers from '../controllers'
import { checkValidRequest, checkValidUser } from '../helpers/auth'

async function userRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', '')

  fastify.route({
    method: 'GET',
    url: '/',
    preHandler: [checkValidRequest, checkValidUser],
    handler: controllers.getAllUsers,
  })

  fastify.route({
    method: 'POST',
    url: '/login',
    handler: controllers.login,
  })

  fastify.route({
    method: 'POST',
    url: '/signup',
    handler: controllers.signUp,
  })
}

export default userRouter
