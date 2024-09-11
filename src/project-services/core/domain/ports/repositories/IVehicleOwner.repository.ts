import { IFilter, IListReturn, IVehicleOwner } from '../../entities';

export interface IVehicleOwnerRepository {
  getById(vehicleOwnerId: number, userId: number): Promise<IVehicleOwner | null>;
  getAll(args: IFilter<IVehicleOwner>): Promise<IListReturn<IVehicleOwner>>;
  create(args: Omit<IVehicleOwner, 'id'>): Promise<IVehicleOwner>;
  update(vehicleOwnerId: number, args: Partial<IVehicleOwner>): Promise<void>;
  changeStatus(vehicleOwnerId: number, status: number): Promise<void>;
}
