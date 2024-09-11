import { FastifyReply, FastifyRequest } from 'fastify';
import { IFilter, IListReturn, IUser } from '../../entities';
import { IUserLoginResponse } from '../../services';

export interface IUserFilterSchema {
  Querystring: IFilter<IUser>;
}

export interface IUserLoginSchema {
  Body: Pick<IUser, 'username' | 'password'>;
}

export interface IUserRegisterSchema {
  Body: Pick<IUser, 'username' | 'email' | 'password'>;
}

export interface IUserChangePasswordSchema {
  Body: {
    oldPassword: string;
    newPassword: string;
  };
}

export interface IUserChangeStatusSchema {
  Body: Pick<IUser, 'id'>;
}

export interface IUserController {
  getAll(filter: FastifyRequest<IUserFilterSchema>): Promise<IListReturn<IUser>>;
  getAllByResolver(_: void, input: IUserFilterSchema['Querystring']): Promise<IListReturn<IUser>>;
  login(req: FastifyRequest<IUserLoginSchema>, reply: FastifyReply): Promise<IUserLoginResponse>;
  register(
    req: FastifyRequest<IUserRegisterSchema>,
    reply: FastifyReply
  ): Promise<IUserLoginResponse>;
  refreshToken(req: FastifyRequest<IUserRegisterSchema>): Promise<string>;
  changePassword(req: FastifyRequest<IUserChangePasswordSchema>): Promise<void>;
  changePasswordByResolver(
    _: void,
    input: IUserChangePasswordSchema['Body'],
    context: { user: IUser }
  ): Promise<void>;
  changeStatus(req: FastifyRequest<IUserChangeStatusSchema>): Promise<void>;
  changeStatusByResolver(_: void, input: IUserChangeStatusSchema['Body']): Promise<void>;
}
