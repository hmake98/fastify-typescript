import { FastifyInstance } from 'fastify'
import { createPostSchema } from '../schema'
import * as controllers from '../controllers'
import { checkValidRequest, checkValidUser } from '../helpers/auth'

async function postRouter(fastify: FastifyInstance) {
    fastify.decorateRequest('authUser', '')

    fastify.route({
        method: 'POST',
        url: '/create',
        schema: createPostSchema,
        handler: controllers.createPost
    })
}

export default postRouter
