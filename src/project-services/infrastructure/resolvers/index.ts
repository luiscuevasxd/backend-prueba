import { typeOperationVehicleResolver } from './type-operation-vehicle.resolver';
import { userResolver } from './user.resolver';
import { vehicleOwnerResolver } from './vehicle-owner.resolver';
import { vehicleResolver } from './vehicle.resolver';

export const resolvers = {
  Query: {
    ...userResolver.Query,
    ...typeOperationVehicleResolver.Query,
    ...vehicleOwnerResolver.Query,
    ...vehicleResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...vehicleOwnerResolver.Mutation,
    ...vehicleResolver.Mutation
  }
} as any;
