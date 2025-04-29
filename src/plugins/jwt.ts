import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { FastifyPluginAsync } from 'fastify';

const jwtPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'super-secret-key', // Replace with ENV-based secure value
  });

  fastify.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  });
};

export default fp(jwtPlugin);
