import { IFilter, IListReturn, IVehicle } from '../../entities';

export interface IVehicleRepository {
  getById(vehicleId: number, userId: number): Promise<IVehicle | null>;
  getAll(args: IFilter<IVehicle>): Promise<IListReturn<IVehicle>>;
  create(args: Omit<IVehicle, 'id'>): Promise<IVehicle>;
  update(vehicleId: number, args: Partial<IVehicle>): Promise<void>;
  changeStatus(userId: number, status: number): Promise<void>;
}
