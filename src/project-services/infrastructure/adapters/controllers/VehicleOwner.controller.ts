import { FastifyRequest } from 'fastify';
import {
  IListReturn,
  IUser,
  IVehicleOwner,
  IVehicleOwnerByIdSchema,
  IVehicleOwnerChangeStatusSchema,
  IVehicleOwnerController,
  IVehicleOwnerCreateSchema,
  IVehicleOwnerFilterSchema,
  IVehicleOwnerService,
  IVehicleOwnerUpdateSchema
} from '../../../core/domain';

export class VehicleOwnerController implements IVehicleOwnerController {
  constructor(private readonly vehicleOwnerService: IVehicleOwnerService) {}

  async getById(req: FastifyRequest<IVehicleOwnerByIdSchema>): Promise<IVehicleOwner> {
    return this.vehicleOwnerService.getById(req.params.id, req.user.id);
  }

  async getByIdByResolver(vehicleId: number, context: { user: IUser }): Promise<IVehicleOwner> {
    return this.vehicleOwnerService.getById(vehicleId, context.user.id);
  }

  async getAll(
    req: FastifyRequest<IVehicleOwnerFilterSchema>
  ): Promise<IListReturn<IVehicleOwner>> {
    return this.vehicleOwnerService.getAll({ ...req.query, userId: req.user.id });
  }

  async getAllByResolver(
    input: IVehicleOwnerFilterSchema['Querystring'],
    context: { user: IUser }
  ): Promise<IListReturn<IVehicleOwner>> {
    return this.vehicleOwnerService.getAll({ ...input, userId: context.user.id });
  }

  async create(req: FastifyRequest<IVehicleOwnerCreateSchema>): Promise<IVehicleOwner> {
    return this.vehicleOwnerService.create({ ...req.body, userId: req.user.id });
  }

  async createByResolver(
    input: IVehicleOwnerCreateSchema['Body'],
    context: { user: IUser }
  ): Promise<IVehicleOwner> {
    return this.vehicleOwnerService.create({ ...input, userId: context.user.id });
  }

  async update(req: FastifyRequest<IVehicleOwnerUpdateSchema>): Promise<void> {
    return this.vehicleOwnerService.update(req.params.id, req.user.id, req.body);
  }

  async updateByResolver(
    { id, ...input }: IVehicleOwnerUpdateSchema['Params'] & IVehicleOwnerUpdateSchema['Body'],
    context: { user: IUser }
  ): Promise<boolean> {
    await this.vehicleOwnerService.update(id, context.user.id, input);

    return true;
  }

  async changeStatus(req: FastifyRequest<IVehicleOwnerChangeStatusSchema>): Promise<void> {
    return this.vehicleOwnerService.changeStatus(req.body.id, req.user.id);
  }

  async changeStatusByResolver(vehicleOwnerId: number, context: { user: IUser }): Promise<boolean> {
    await this.vehicleOwnerService.changeStatus(vehicleOwnerId, context.user.id);

    return true;
  }
}
