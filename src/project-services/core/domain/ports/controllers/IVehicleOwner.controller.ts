import { FastifyRequest } from 'fastify';
import { IFilter, IListReturn, IUser, IVehicleOwner } from '../../entities';

export interface IVehicleOwnerByIdSchema {
  Params: Pick<IVehicleOwner, 'id'>;
}

export interface IVehicleOwnerFilterSchema {
  Querystring: IFilter<IVehicleOwner>;
}

export interface IVehicleOwnerCreateSchema {
  Body: Omit<IVehicleOwner, 'id'>;
}

export interface IVehicleOwnerUpdateSchema {
  Params: Pick<IVehicleOwner, 'id'>;
  Body: Partial<IVehicleOwner>;
}

export interface IVehicleOwnerChangeStatusSchema {
  Body: Pick<IVehicleOwner, 'id'>;
}

export interface IVehicleOwnerController {
  getById(req: FastifyRequest<IVehicleOwnerByIdSchema>): Promise<IVehicleOwner>;
  getByIdByResolver(vehicleId: number, context: { user: IUser }): Promise<IVehicleOwner>;
  getAll(req: FastifyRequest<IVehicleOwnerFilterSchema>): Promise<IListReturn<IVehicleOwner>>;
  getAllByResolver(
    input: IVehicleOwnerFilterSchema['Querystring'],
    context: { user: IUser }
  ): Promise<IListReturn<IVehicleOwner>>;
  create(req: FastifyRequest<IVehicleOwnerCreateSchema>): Promise<IVehicleOwner>;
  createByResolver(
    input: IVehicleOwnerCreateSchema['Body'],
    context: { user: IUser }
  ): Promise<IVehicleOwner>;
  update(req: FastifyRequest<IVehicleOwnerUpdateSchema>): Promise<void>;
  updateByResolver(
    { id, ...input }: IVehicleOwnerUpdateSchema['Params'] & IVehicleOwnerUpdateSchema['Body'],
    context: { user: IUser }
  ): Promise<boolean>;
  changeStatus(req: FastifyRequest<IVehicleOwnerChangeStatusSchema>): Promise<void>;
  changeStatusByResolver(vehicleOwnerId: number, context: { user: IUser }): Promise<boolean>;
}
