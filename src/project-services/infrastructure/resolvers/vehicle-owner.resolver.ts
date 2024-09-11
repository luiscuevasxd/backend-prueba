import {
  IUser,
  IVehicleOwnerCreateSchema,
  IVehicleOwnerFilterSchema,
  IVehicleOwnerUpdateSchema
} from '../../core/domain';
import { vehicleOwnerController } from '../di';

export const vehicleOwnerResolver = {
  Query: {
    getVehicleOwnerById: (_: void, data: { vehicleOwnerId: number }, context: { user: IUser }) =>
      vehicleOwnerController.getByIdByResolver(data.vehicleOwnerId, context),
    getVehicleOwners: (
      _: void,
      data: { input: IVehicleOwnerFilterSchema['Querystring'] },
      context: { user: IUser }
    ) => vehicleOwnerController.getAllByResolver(data.input, context)
  },
  Mutation: {
    createVehicleOwner: (
      _: void,
      data: { input: IVehicleOwnerCreateSchema['Body'] },
      context: { user: IUser }
    ) => vehicleOwnerController.createByResolver(data.input, context),
    updateVehicleOwner: (
      _: void,
      data: { input: IVehicleOwnerUpdateSchema['Params'] & IVehicleOwnerUpdateSchema['Body'] },
      context: { user: IUser }
    ) => vehicleOwnerController.updateByResolver(data.input, context),
    changeStatusVehicleOwner: (
      _: void,
      data: { vehicleOwnerId: number },
      context: { user: IUser }
    ) => vehicleOwnerController.changeStatusByResolver(data.vehicleOwnerId, context)
  }
};
