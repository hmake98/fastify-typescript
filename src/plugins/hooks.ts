// declare plugins here and register this file into index.ts to use 

import { FastifyInstance } from 'fastify';

async function mainHooks(fastify: FastifyInstance) {
    fastify.addHook('onRequest', (request, reply, done) => {
        console.log('On request', request.body)
        done();
    })
}

export default mainHooks