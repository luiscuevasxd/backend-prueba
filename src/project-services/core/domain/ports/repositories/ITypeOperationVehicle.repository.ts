import { ITypeOperationVehicle } from '../../entities';

export interface ITypeOperationVehicleRepository {
  getAll(): Promise<ITypeOperationVehicle[]>;
}
