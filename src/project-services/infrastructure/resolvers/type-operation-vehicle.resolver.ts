import { typeOperationVehicleController } from '../di';

export const typeOperationVehicleResolver = {
  Query: {
    getTypeOperationVehicles: () => typeOperationVehicleController.getAll()
  }
};
