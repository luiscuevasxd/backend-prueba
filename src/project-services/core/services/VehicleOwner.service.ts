import { NotFoundError } from '../../infrastructure/utils';
import {
  ErrorCode,
  ErrorMessage,
  IFilter,
  IListReturn,
  IVehicleOwner,
  IVehicleOwnerRepository,
  IVehicleOwnerService
} from '../domain';

export class VehicleOwnerService implements IVehicleOwnerService {
  constructor(private readonly vehicleOwnerRepository: IVehicleOwnerRepository) {}

  async getById(vehicleOwnerId: number, userId: number): Promise<IVehicleOwner> {
    const vehicleOwner = await this.vehicleOwnerRepository.getById(vehicleOwnerId, userId);

    if (!vehicleOwner) {
      throw new NotFoundError(ErrorMessage.VEHICLE_OWNER_NOT_FOUND, {
        code: ErrorCode.VEHICLE_OWNER_NOT_FOUND
      });
    }

    return vehicleOwner;
  }

  async getAll(filter: IFilter<IVehicleOwner>): Promise<IListReturn<IVehicleOwner>> {
    return this.vehicleOwnerRepository.getAll(filter);
  }

  async create(args: Omit<IVehicleOwner, 'id'>): Promise<IVehicleOwner> {
    return this.vehicleOwnerRepository.create(args);
  }

  async update(
    vehicleOwnerId: number,
    userId: number,
    args: Partial<IVehicleOwner>
  ): Promise<void> {
    await this.getById(vehicleOwnerId, userId);

    return this.vehicleOwnerRepository.update(vehicleOwnerId, args);
  }

  async changeStatus(vehicleOwnerId: number, userId: number): Promise<void> {
    const vehicleOwner = await this.getById(vehicleOwnerId, userId);

    return this.vehicleOwnerRepository.changeStatus(vehicleOwner.id, vehicleOwner?.status ? 0 : 1);
  }
}
