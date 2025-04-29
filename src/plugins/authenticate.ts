import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async (app) => {
  app.decorate(
    'authenticateRole',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        // await request.jwtVerify();
        console.log('authenticateRole');
      } catch (err) {
        reply.send(err);
      }
    },
  );
});
