import { ITypeOperationVehicle } from '../../entities';

export interface ITypeOperationVehicleController {
  getAll(): Promise<ITypeOperationVehicle[]>;
}
