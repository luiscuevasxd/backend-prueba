import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { ErrorCode, ErrorMessage, type IUser } from '../../core/domain';
import { NotFoundError } from './ApiError.util';
import { getEnvVariableValue } from './envVariableValidator.util';

declare module 'fastify' {
  interface FastifyRequest {
    user: IUser;
  }
}

const validationToken = (authorization?: string) => {
  if (!authorization) {
    throw new NotFoundError(ErrorMessage.UNAUTHORIZED, {
      code: ErrorCode.UNAUTHORIZED
    });
  }

  const validationToken = jwt.verify(
    authorization.replace('Bearer ', ''),
    getEnvVariableValue('JWT_SECRET')
  );

  if (!validationToken) {
    throw new NotFoundError(ErrorMessage.UNAUTHORIZED, {
      code: ErrorCode.UNAUTHORIZED
    });
  }

  return validationToken;
};

export function authorizeContext(req: FastifyRequest, _: FastifyReply, next: () => void): void {
  validationToken(req.headers['authorization']);

  return next();
}

export function authorizeContextGraphql(req: FastifyRequest): { user: IUser } {
  const response = validationToken(req.headers['authorization']) as IUser;

  return { user: response };
}
