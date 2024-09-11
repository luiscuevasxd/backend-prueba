import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ApiError } from './ApiError.util';
import { logger } from './LogFormatter.util';

export function errorFormatter(error: FastifyError, _: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ApiError) {
    logger.error('error-formatter', {
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      message: error.message,
      errorDetails: error.errorDetails
    });
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      message: error.message,
      errorDetails: error.errorDetails
    });
  }

  logger.error('error-formatter', {
    statusCode: error.statusCode,
    message: error.message
  });
  reply.status(500).send(error);
}
