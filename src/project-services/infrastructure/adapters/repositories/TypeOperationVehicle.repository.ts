import {
  IModelTypes,
  ITypeOperationVehicle,
  ITypeOperationVehicleRepository
} from '../../../core/domain';
import { TypeOperationVehicle } from '../models';

export class TypeOperationVehicleRepository implements ITypeOperationVehicleRepository {
  constructor(private readonly models: IModelTypes) {}

  async getAll(): Promise<ITypeOperationVehicle[]> {
    const typeOperationVehicleRepository = this.models.getRepository(TypeOperationVehicle);

    return typeOperationVehicleRepository.find();
  }
}
