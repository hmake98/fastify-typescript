import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';
import { ApiError } from 'src/types/api';

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): void {
  const statusCode = error.statusCode || 500;

  // Don't expose internal server errors to clients
  const errorMessage =
    statusCode === 500 ? 'Internal Server Error' : error.message;

  // Prepare the error response
  const errorResponse: ApiError = {
    error: errorMessage,
    statusCode,
  };

  // Add validation errors if available
  if (error.validation) {
    errorResponse.validation = error.validation.map((v) => ({
      field: v.schemaPath?.slice(1) || '',
      // v.dataPath?.slice(1) || '',
      message: v.message || 'Invalid value',
    }));
  }

  // Log the detailed error for debugging (but not in tests)
  if (process.env.NODE_ENV !== 'test') {
    request.log.error(error);
  }

  reply.status(statusCode).send(errorResponse);
}
