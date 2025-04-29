import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

const loggerPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.log.info('Logger initialized');
};

export default fp(loggerPlugin);
