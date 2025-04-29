import { FastifyInstance } from 'fastify';
import fastify from 'fastify';
// import pino from 'pino';
import userRouter from './routes/user.router';
import postRouter from './routes/post.router';
import { utils } from './utils';
// import formbody from '@fastify/formbody';
// import cors from '@fastify/cors';
// import helmet from '@fastify/helmet';
// import { registerPlugins } from './plugins';
import { registerMiddleware } from './middleware';
import { logger } from './config/logger';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';

export const makeApp = async (): Promise<FastifyInstance> => {
  const app = fastify({
    // logger: pino({ level: process.env.LOG_LEVEL }),
    logger: logger,
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        coerceTypes: true,
        useDefaults: true,
      },
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Register middlewares
  // app.register(formbody);
  // app.register(cors);
  // app.register(helmet);

  await registerMiddleware(app);
  // Auto-load plugins
  await app.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
  });

  // Register routes
  app.register(userRouter, { prefix: '/v1' });
  app.register(postRouter, { prefix: '/v1' });

  // Set error handler
  // app.setErrorHandler((error, _request, reply) => {
  //   app.log.error(error);
  //   reply.status(500).send({ error: 'Something went wrong' });
  // });

  // Health check route
  app.get('/health', async (_request, reply) => {
    try {
      await utils.healthCheck();
      reply.status(200).send({
        message: 'Health check endpoint success.',
      });
    } catch (e) {
      console.error('Health check failed:', e);
      reply.status(500).send({
        message: 'Health check endpoint failed.',
      });
    }
  });

  // Root route
  app.get('/', (_request, reply) => {
    reply.status(200).send({ message: 'Hello from fastify boilerplate!' });
  });

  // await registerPlugins(app);

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        await app.close();
        app.log.error(`Closed application on ${signal}`);
        process.exit(0);
      } catch (err) {
        app.log.error(`Error closing application on ${signal}`, err);
        process.exit(1);
      }
    });
  });

  return app;
};
