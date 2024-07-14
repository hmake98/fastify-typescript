import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    authUser?: {
      id: number;
      email: string;
    };
  }
}
