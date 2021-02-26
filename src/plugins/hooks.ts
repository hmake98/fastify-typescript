// declare plugins here and register this file into index.ts to use 

import { FastifyInstance } from 'fastify';

async function Hooks(fastify: FastifyInstance) {
    fastify.addHook('preHandler', (request, reply, next) => {
        console.log(request.body)
        next()
    })
}

export default Hooks