import { FindOptionsWhere, Like } from 'typeorm';
import {
  IFilter,
  IListReturn,
  IModelTypes,
  IVehicleOwner,
  IVehicleOwnerRepository
} from '../../../core/domain';
import { VehicleOwner } from '../models';

export class VehicleOwnerRepository implements IVehicleOwnerRepository {
  constructor(private readonly models: IModelTypes) {}

  async getById(vehicleOwnerId: number, userId: number): Promise<IVehicleOwner | null> {
    const vehicleOwnerRepository = this.models.getRepository(VehicleOwner);

    return vehicleOwnerRepository.findOneBy({ id: vehicleOwnerId, userId });
  }

  async getAll({
    page,
    perPage,
    sortOrder,
    sortField,
    ...filter
  }: IFilter<IVehicleOwner>): Promise<IListReturn<IVehicleOwner>> {
    const vehicleOwnerRepository = this.models.getRepository(VehicleOwner);

    const whereClause: FindOptionsWhere<VehicleOwner> = {};

    if (filter.name) {
      whereClause.name = Like(`%${filter.name}%`);
    }

    if (filter.lastname) {
      whereClause.lastname = Like(`%${filter.lastname}%`);
    }

    if (filter.age) {
      whereClause.age = filter.age;
    }

    if (filter.status) {
      whereClause.status = filter.status;
    }

    const vehicleOwners = await vehicleOwnerRepository.findAndCount({
      where: filter.search
        ? [
            { ...whereClause, name: Like(`%${filter.search}%`) },
            { ...whereClause, lastname: Like(`%${filter.search}%`) }
          ]
        : whereClause,
      skip: ((page ?? 1) - 1) * (perPage ?? 100),
      take: perPage ?? 100,
      order: {
        [sortField ?? 'createdAt']: sortOrder ?? 'desc'
      }
    });

    return {
      data: vehicleOwners[0],
      metaData: {
        page: page ?? 1,
        perPage: perPage ?? 100,
        totalCount: vehicleOwners[1]
      }
    };
  }

  async create(args: IVehicleOwner): Promise<IVehicleOwner> {
    const vehicleOwnerRepository = this.models.getRepository(VehicleOwner);

    return vehicleOwnerRepository.save({ ...args, status: args.status ?? 1 });
  }

  async update(vehicleOwnerId: number, args: IVehicleOwner): Promise<void> {
    const vehicleOwnerRepository = this.models.getRepository(VehicleOwner);

    await vehicleOwnerRepository.update({ id: vehicleOwnerId }, args);
  }

  async changeStatus(vehicleOwnerId: number, status: number): Promise<void> {
    const vehicleOwnerRepository = this.models.getRepository(VehicleOwner);

    await vehicleOwnerRepository.update({ id: vehicleOwnerId }, { status });
  }
}
