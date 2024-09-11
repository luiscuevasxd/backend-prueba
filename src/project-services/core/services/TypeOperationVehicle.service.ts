import {
  ITypeOperationVehicle,
  ITypeOperationVehicleRepository,
  ITypeOperationVehicleService
} from '../domain';

export class TypeOperationVehicleService implements ITypeOperationVehicleService {
  constructor(private readonly typeOperationVehicleRepository: ITypeOperationVehicleRepository) {}

  async getAll(): Promise<ITypeOperationVehicle[]> {
    return this.typeOperationVehicleRepository.getAll();
  }
}
