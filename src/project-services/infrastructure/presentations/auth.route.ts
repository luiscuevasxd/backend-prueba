import { FastifyInstance, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { IUserLoginSchema, IUserRegisterSchema } from '../../core/domain';
import { userController } from '../di';
import { userLoginInputSchema, userRegisterInputSchema } from '../schemas';

export default function authRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.post('/login', {
    schema: userLoginInputSchema,
    handler: (req: FastifyRequest<IUserLoginSchema>) => userController.login(req)
  });

  fastify.post('/register', {
    schema: userRegisterInputSchema,
    handler: (req: FastifyRequest<IUserRegisterSchema>) => userController.register(req)
  });

  fastify.get('/refresh-token', {
    handler: (req: FastifyRequest) => userController.refreshToken(req)
  });

  next();
}
