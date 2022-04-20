import { FastifyInstance } from 'fastify'
import { loginSchema, signupSchema } from '../schema'
import * as controllers from '../controllers'

async function userRouter(fastify: FastifyInstance) {
  fastify.decorateRequest('authUser', '')

  fastify.route({
    method: 'POST',
    url: '/login',
    schema: loginSchema,
    handler: controllers.login,
  })

  fastify.route({
    method: 'POST',
    url: '/signup',
    schema: signupSchema,
    handler: controllers.signUp,
  })
}

export default userRouter
