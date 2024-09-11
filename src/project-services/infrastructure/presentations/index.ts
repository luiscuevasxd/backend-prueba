import { FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import authRoutes from './auth.route';
import typeOperationVehicleRoutes from './type-operation-vehicle.route';
import userRoutes from './user.route';
import vehicleOwnerRoutes from './vehicle-owner.route';
import vehicleRoutes from './vehicle.route';

export function registerAppRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.register(authRoutes, {
    prefix: 'auth'
  });

  fastify.register(userRoutes, {
    prefix: 'users'
  });

  fastify.register(vehicleOwnerRoutes, {
    prefix: 'vehicle-owners'
  });

  fastify.register(vehicleRoutes, {
    prefix: 'vehicles'
  });

  fastify.register(typeOperationVehicleRoutes, {
    prefix: 'type-operation-vehicles'
  });

  next();
}
