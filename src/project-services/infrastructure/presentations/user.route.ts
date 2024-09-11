import { FastifyInstance, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {
  IUserChangePasswordSchema,
  IUserChangeStatusSchema,
  IUserFilterSchema
} from '../../core/domain';
import { userController } from '../di';
import {
  userChangePasswordInputSchema,
  userChangeStatusInputSchema,
  userFilterSchema
} from '../schemas';
import { authorizeContext } from '../utils';

export default function userRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get('/', {
    schema: userFilterSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IUserFilterSchema>) => userController.getAll(req)
  });

  fastify.post('/change-password', {
    schema: userChangePasswordInputSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IUserChangePasswordSchema>) => userController.changePassword(req)
  });

  fastify.post('/change-status', {
    schema: userChangeStatusInputSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IUserChangeStatusSchema>) => userController.changeStatus(req)
  });

  next();
}
