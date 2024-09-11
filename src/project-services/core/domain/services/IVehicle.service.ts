import { IFilter, IListReturn, IVehicle } from '../entities';

export interface IVehicleService {
  getById(vehicleId: number, userId: number): Promise<IVehicle>;
  getAll(args: IFilter<IVehicle>): Promise<IListReturn<IVehicle>>;
  create(args: Omit<IVehicle, 'id'>): Promise<IVehicle>;
  update(vehicleId: number, userId: number, args: Partial<IVehicle>): Promise<void>;
  changeStatus(vehicleId: number, userId: number): Promise<void>;
}
