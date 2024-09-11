import { FastifyRequest } from 'fastify';
import {
  IListReturn,
  IUser,
  IUserChangePasswordSchema,
  IUserChangeStatusSchema,
  IUserController,
  IUserFilterSchema,
  IUserLoginResponse,
  IUserLoginSchema,
  IUserRegisterSchema,
  IUserService
} from '../../../core/domain';

export class UserController implements IUserController {
  constructor(private readonly userService: IUserService) {}

  async getAll(req: FastifyRequest<IUserFilterSchema>): Promise<IListReturn<IUser>> {
    return this.userService.getAll(req.query);
  }

  async getAllByResolver(
    _: void,
    input: IUserFilterSchema['Querystring']
  ): Promise<IListReturn<IUser>> {
    const users = await this.userService.getAll(input);

    return users;
  }

  async login(req: FastifyRequest<IUserLoginSchema>): Promise<IUserLoginResponse> {
    return this.userService.login(req.body);
  }

  async register(req: FastifyRequest<IUserRegisterSchema>): Promise<IUserLoginResponse> {
    return this.userService.register(req.body);
  }

  async refreshToken(req: FastifyRequest): Promise<string> {
    return this.userService.refreshToken(req.user.id);
  }

  async changePassword(req: FastifyRequest<IUserChangePasswordSchema>): Promise<void> {
    return this.userService.changePassword(req.user.id, req.body.oldPassword, req.body.newPassword);
  }

  async changePasswordByResolver(
    _: void,
    input: IUserChangePasswordSchema['Body'],
    context: { user: IUser }
  ): Promise<void> {
    return this.userService.changePassword(context.user.id, input.oldPassword, input.newPassword);
  }

  async changeStatus(req: FastifyRequest<IUserChangeStatusSchema>): Promise<void> {
    return this.userService.changeStatus(req.body.id);
  }

  async changeStatusByResolver(_: void, input: IUserChangeStatusSchema['Body']): Promise<void> {
    return this.userService.changeStatus(input.id);
  }
}
