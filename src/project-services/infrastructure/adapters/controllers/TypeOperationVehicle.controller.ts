import {
  ITypeOperationVehicle,
  ITypeOperationVehicleController,
  ITypeOperationVehicleService
} from '../../../core/domain';

export class TypeOperationVehicleController implements ITypeOperationVehicleController {
  constructor(private readonly typeOperationVehicleService: ITypeOperationVehicleService) {}

  async getAll(): Promise<ITypeOperationVehicle[]> {
    return this.typeOperationVehicleService.getAll();
  }
}
