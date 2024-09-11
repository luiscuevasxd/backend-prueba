import { ITypeOperationVehicle } from '../entities';

export interface ITypeOperationVehicleService {
  getAll(): Promise<ITypeOperationVehicle[]>;
}
