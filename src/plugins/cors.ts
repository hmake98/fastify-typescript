import fp from 'fastify-plugin';
import cors from '@fastify/cors';
import { FastifyPluginAsync } from 'fastify';

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(cors, {
    origin: '*', // Customize per environment
    credentials: true,
  });
};

export default fp(corsPlugin);
