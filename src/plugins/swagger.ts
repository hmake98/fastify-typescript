import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

const userSchema: any = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: ['user', 'admin'] },
    created_at: { type: 'string', format: 'date-time' },
    updated_at: { type: 'string', format: 'date-time' },
  },
};

const swaggerPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Fastify API',
        description: 'API Documentation',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:${process.env.API_PORT}`,
          description: 'Local server',
        },
      ],
      components: {
        schemas: {
          userSchema,
        },
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      tags: [{ name: 'user', description: 'User endpoints' }],
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  });
};

// 👇 wrap it with fastify-plugin
export default fp(swaggerPlugin);
