import fp from 'fastify-plugin';
import formbody from '@fastify/formbody';
import { FastifyPluginAsync } from 'fastify';

const formBodyPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(formbody);
};

export default fp(formBodyPlugin);
