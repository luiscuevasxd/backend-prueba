import { FastifyRequest } from 'fastify';
import { IFilter, IListReturn, IUser, IVehicle } from '../../entities';

export interface IVehicleByIdSchema {
  Params: Pick<IVehicle, 'id'>;
}

export interface IVehicleFilterSchema {
  Querystring: IFilter<IVehicle>;
}

export interface IVehicleCreateSchema {
  Body: Omit<IVehicle, 'id'>;
}

export interface IVehicleUpdateSchema {
  Params: Pick<IVehicle, 'id'>;
  Body: Partial<IVehicle>;
}

export interface IVehicleChangeStatusSchema {
  Body: Pick<IVehicle, 'id'>;
}

export interface IVehicleController {
  getById(req: FastifyRequest<IVehicleByIdSchema>): Promise<IVehicle>;
  getByIdByResolver(vehicleId: number, context: { user: IUser }): Promise<IVehicle>;
  getAll(req: FastifyRequest<IVehicleFilterSchema>): Promise<IListReturn<IVehicle>>;
  getAllByResolver(
    input: IVehicleFilterSchema['Querystring'],
    context: { user: IUser }
  ): Promise<IListReturn<IVehicle>>;
  create(req: FastifyRequest<IVehicleCreateSchema>): Promise<IVehicle>;
  createByResolver(
    input: IVehicleCreateSchema['Body'],
    context: { user: IUser }
  ): Promise<IVehicle>;
  update(req: FastifyRequest<IVehicleUpdateSchema>): Promise<void>;
  updateByResolver(
    { id, ...input }: IVehicleUpdateSchema['Params'] & IVehicleUpdateSchema['Body'],
    context: { user: IUser }
  ): Promise<boolean>;
  changeStatus(req: FastifyRequest<IVehicleChangeStatusSchema>): Promise<void>;
  changeStatusByResolver(vehicleId: number, context: { user: IUser }): Promise<boolean>;
}
