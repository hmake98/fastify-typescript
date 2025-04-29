import fp from 'fastify-plugin';
import rateLimit from '@fastify/rate-limit';
import { FastifyPluginAsync } from 'fastify';

const rateLimitPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
};

export default fp(rateLimitPlugin);
