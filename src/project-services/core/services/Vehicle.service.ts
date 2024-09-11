import { NotFoundError } from '../../infrastructure/utils';
import {
  ErrorCode,
  ErrorMessage,
  IFilter,
  IListReturn,
  IVehicle,
  IVehicleRepository,
  IVehicleService
} from '../domain';

export class VehicleService implements IVehicleService {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async getById(vehicleId: number, userId: number): Promise<IVehicle> {
    const vehicle = await this.vehicleRepository.getById(vehicleId, userId);

    if (!vehicle) {
      throw new NotFoundError(ErrorMessage.VEHICLE_NOT_FOUND, {
        code: ErrorCode.VEHICLE_NOT_FOUND
      });
    }

    return vehicle;
  }

  async getAll(filter: IFilter<IVehicle>): Promise<IListReturn<IVehicle>> {
    return this.vehicleRepository.getAll(filter);
  }

  async create(args: Omit<IVehicle, 'id'>): Promise<IVehicle> {
    return this.vehicleRepository.create(args);
  }

  async update(vehicleId: number, userId: number, args: Partial<IVehicle>): Promise<void> {
    await this.getById(vehicleId, userId);

    return this.vehicleRepository.update(vehicleId, args);
  }

  async changeStatus(vehicleId: number, userId: number): Promise<void> {
    const vehicle = await this.getById(vehicleId, userId);

    return this.vehicleRepository.changeStatus(vehicle.id, vehicle?.status ? 0 : 1);
  }
}
