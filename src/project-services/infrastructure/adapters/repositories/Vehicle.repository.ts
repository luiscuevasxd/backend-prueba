import { FindOptionsWhere, Like } from 'typeorm';
import {
  IFilter,
  IListReturn,
  IModelTypes,
  IVehicle,
  IVehicleRepository
} from '../../../core/domain';
import { Vehicle } from '../models';

export class VehicleRepository implements IVehicleRepository {
  constructor(private readonly models: IModelTypes) {}

  async getById(vehicleId: number): Promise<IVehicle | null> {
    const vehicleRepository = this.models.getRepository(Vehicle);

    return vehicleRepository.findOneBy({ id: vehicleId });
  }

  async getAll({
    page,
    perPage,
    sortOrder,
    sortField,
    ...filter
  }: IFilter<IVehicle>): Promise<IListReturn<IVehicle>> {
    const vehicleRepository = this.models.getRepository(Vehicle);

    const whereClause: FindOptionsWhere<Vehicle> = {};

    if (filter.brand) {
      whereClause.brand = Like(`%${filter.brand}%`);
    }

    if (filter.model) {
      whereClause.model = Like(`%${filter.model}%`);
    }

    if (filter.typeOperationVehicleId) {
      whereClause.typeOperationVehicleId = filter.typeOperationVehicleId;
    }

    if (filter.vehicleOwnerId) {
      whereClause.vehicleOwnerId = filter.vehicleOwnerId;
    }

    if (filter.status) {
      whereClause.status = filter.status;
    }

    const vehicles = await vehicleRepository.findAndCount({
      where: filter.search
        ? [
            { ...whereClause, brand: Like(`%${filter.search}%`) },
            { ...whereClause, model: Like(`%${filter.search}%`) }
          ]
        : whereClause,
      relations: ['typeOperationVehicle', 'vehicleOwner'],
      skip: ((page ?? 1) - 1) * (perPage ?? 100),
      take: perPage ?? 100,
      order: {
        [sortField ?? 'createdAt']: sortOrder ?? 'desc'
      }
    });

    return {
      data: vehicles[0],
      metaData: {
        page: page ?? 1,
        perPage: perPage ?? 100,
        totalCount: vehicles[1]
      }
    };
  }

  async create(args: IVehicle): Promise<IVehicle> {
    const vehicleRepository = this.models.getRepository(Vehicle);

    return vehicleRepository.save({ ...args, status: args.status ?? 1 });
  }

  async update(vehicleId: number, args: IVehicle): Promise<void> {
    const vehicleRepository = this.models.getRepository(Vehicle);

    await vehicleRepository.update({ id: vehicleId }, args);
  }

  async changeStatus(vehicleId: number, status: number): Promise<void> {
    const vehicleRepository = this.models.getRepository(Vehicle);

    await vehicleRepository.update({ id: vehicleId }, { status });
  }
}
