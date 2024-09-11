import {
  IUser,
  IVehicleCreateSchema,
  IVehicleFilterSchema,
  IVehicleUpdateSchema
} from '../../core/domain';
import { vehicleController } from '../di';

export const vehicleResolver = {
  Query: {
    getVehicleById: (_: void, data: { vehicleId: number }, context: { user: IUser }) =>
      vehicleController.getByIdByResolver(data.vehicleId, context),
    getVehicles: (
      _: void,
      data: { input: IVehicleFilterSchema['Querystring'] },
      context: { user: IUser }
    ) => vehicleController.getAllByResolver(data.input, context)
  },
  Mutation: {
    createVehicle: (
      _: void,
      data: { input: IVehicleCreateSchema['Body'] },
      context: { user: IUser }
    ) => vehicleController.createByResolver(data.input, context),
    updateVehicle: (
      _: void,
      data: { input: IVehicleUpdateSchema['Params'] & IVehicleUpdateSchema['Body'] },
      context: { user: IUser }
    ) => vehicleController.updateByResolver(data.input, context),
    changeStatusVehicle: (_: void, data: { vehicleId: number }, context: { user: IUser }) =>
      vehicleController.changeStatusByResolver(data.vehicleId, context)
  }
};
