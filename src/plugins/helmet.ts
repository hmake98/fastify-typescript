import fp from 'fastify-plugin';
import helmet from '@fastify/helmet';
import { FastifyPluginAsync } from 'fastify';

const helmetPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(helmet);
};

export default fp(helmetPlugin);
