import { FastifyRequest } from 'fastify';
import {
  IListReturn,
  IUser,
  IVehicle,
  IVehicleByIdSchema,
  IVehicleChangeStatusSchema,
  IVehicleController,
  IVehicleCreateSchema,
  IVehicleFilterSchema,
  IVehicleService,
  IVehicleUpdateSchema
} from '../../../core/domain';

export class VehicleController implements IVehicleController {
  constructor(private readonly vehicleService: IVehicleService) {}

  async getById(req: FastifyRequest<IVehicleByIdSchema>): Promise<IVehicle> {
    return this.vehicleService.getById(req.params.id, req.user.id);
  }

  async getByIdByResolver(vehicleId: number, context: { user: IUser }): Promise<IVehicle> {
    return this.vehicleService.getById(vehicleId, context.user.id);
  }

  async getAll(req: FastifyRequest<IVehicleFilterSchema>): Promise<IListReturn<IVehicle>> {
    return this.vehicleService.getAll({ ...req.query, userId: req.user.id });
  }

  async getAllByResolver(
    input: IVehicleFilterSchema['Querystring'],
    context: { user: IUser }
  ): Promise<IListReturn<IVehicle>> {
    return this.vehicleService.getAll({ ...input, userId: context.user.id });
  }

  async create(req: FastifyRequest<IVehicleCreateSchema>): Promise<IVehicle> {
    return this.vehicleService.create({ ...req.body, userId: req.user.id });
  }

  async createByResolver(
    input: IVehicleCreateSchema['Body'],
    context: { user: IUser }
  ): Promise<IVehicle> {
    return this.vehicleService.create({ ...input, userId: context.user.id });
  }

  async update(req: FastifyRequest<IVehicleUpdateSchema>): Promise<void> {
    return this.vehicleService.update(req.params.id, req.user.id, req.body);
  }

  async updateByResolver(
    { id, ...input }: IVehicleUpdateSchema['Params'] & IVehicleUpdateSchema['Body'],
    context: { user: IUser }
  ): Promise<boolean> {
    await this.vehicleService.update(id, context.user.id, input);

    return true;
  }

  async changeStatus(req: FastifyRequest<IVehicleChangeStatusSchema>): Promise<void> {
    return this.vehicleService.changeStatus(req.body.id, req.user.id);
  }

  async changeStatusByResolver(vehicleId: number, context: { user: IUser }): Promise<boolean> {
    await this.vehicleService.changeStatus(vehicleId, context.user.id);

    return true;
  }
}
