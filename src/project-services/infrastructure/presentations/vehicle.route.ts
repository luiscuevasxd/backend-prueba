import { FastifyInstance, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {
  IVehicleByIdSchema,
  IVehicleChangeStatusSchema,
  IVehicleCreateSchema,
  IVehicleFilterSchema,
  IVehicleUpdateSchema
} from '../../core/domain';
import { vehicleController } from '../di';
import {
  vehicleByIdSchema,
  vehicleChangeStatusInputSchema,
  vehicleCreateInputSchema,
  vehicleFilterSchema,
  vehicleUpdateSchema
} from '../schemas';
import { authorizeContext } from '../utils';

export default function vehicleRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get('/:id', {
    schema: vehicleByIdSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleByIdSchema>) => vehicleController.getById(req)
  });

  fastify.get('/', {
    schema: vehicleFilterSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleFilterSchema>) => vehicleController.getAll(req)
  });

  fastify.post('/', {
    schema: vehicleCreateInputSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleCreateSchema>) => vehicleController.create(req)
  });

  fastify.patch('/:id', {
    schema: vehicleUpdateSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleUpdateSchema>) => vehicleController.update(req)
  });

  fastify.post('/change-status', {
    schema: vehicleChangeStatusInputSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleChangeStatusSchema>) =>
      vehicleController.changeStatus(req)
  });

  next();
}
