import fp from 'fastify-plugin';
import bcrypt from 'bcryptjs';

declare module 'fastify' {
  interface FastifyInstance {
    bcrypt: typeof bcrypt;
  }
}

export default fp(async (fastify) => {
  fastify.decorate('bcrypt', bcrypt);
});

// Then use it like:

// const hashed = await fastify.bcrypt.hash(password, 10);
// const match = await fastify.bcrypt.compare(plain, hashed);
