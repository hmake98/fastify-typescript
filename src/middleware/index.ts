import { FastifyInstance } from 'fastify';
import { errorHandler } from './error-handler';
import { requestLogger } from './request-logger';

export async function registerMiddleware(app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', requestLogger);
  app.setErrorHandler(errorHandler);
}
