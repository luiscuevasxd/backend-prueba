import { FastifyInstance, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import {
  IVehicleOwnerByIdSchema,
  IVehicleOwnerChangeStatusSchema,
  IVehicleOwnerCreateSchema,
  IVehicleOwnerFilterSchema,
  IVehicleOwnerUpdateSchema
} from '../../core/domain';
import { vehicleOwnerController } from '../di';
import {
  vehicleOwnerByIdSchema,
  vehicleOwnerChangeStatusInputSchema,
  vehicleOwnerCreateInputSchema,
  vehicleOwnerFilterSchema,
  vehicleOwnerUpdateSchema
} from '../schemas';
import { authorizeContext } from '../utils';

export default function vehicleOwnerRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get('/:id', {
    schema: vehicleOwnerByIdSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleOwnerByIdSchema>) => vehicleOwnerController.getById(req)
  });

  fastify.get('/', {
    schema: vehicleOwnerFilterSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleOwnerFilterSchema>) => vehicleOwnerController.getAll(req)
  });

  fastify.post('/', {
    schema: vehicleOwnerCreateInputSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleOwnerCreateSchema>) => vehicleOwnerController.create(req)
  });

  fastify.patch('/:id', {
    schema: vehicleOwnerUpdateSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleOwnerUpdateSchema>) => vehicleOwnerController.update(req)
  });

  fastify.post('/change-status', {
    schema: vehicleOwnerChangeStatusInputSchema,
    preHandler: [authorizeContext],
    handler: (req: FastifyRequest<IVehicleOwnerChangeStatusSchema>) =>
      vehicleOwnerController.changeStatus(req)
  });

  next();
}
