import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { typeOperationVehicleController } from '../di';
import { authorizeContext } from '../utils';

export default function typeOperationVehicleRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get('/', {
    preHandler: [authorizeContext],
    handler: () => typeOperationVehicleController.getAll()
  });

  next();
}
