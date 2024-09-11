import { IFilter, IListReturn, IVehicleOwner } from '../entities';

export interface IVehicleOwnerService {
  getById(vehicleOwnerId: number, userId: number): Promise<IVehicleOwner>;
  getAll(args: IFilter<IVehicleOwner>): Promise<IListReturn<IVehicleOwner>>;
  create(args: Omit<IVehicleOwner, 'id'>): Promise<IVehicleOwner>;
  update(vehicleOwnerId: number, userId: number, args: Partial<IVehicleOwner>): Promise<void>;
  changeStatus(vehicleOwnerId: number, userId: number): Promise<void>;
}
