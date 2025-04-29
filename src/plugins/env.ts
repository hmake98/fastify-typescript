import fp from 'fastify-plugin';
import dotenv from 'dotenv';
dotenv.config();

export default fp(async (fastify) => {
  // You can attach env to Fastify instance if needed
  fastify.decorate('config', process.env);
});
