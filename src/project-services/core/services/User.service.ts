import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestError, getEnvVariableValue, NotFoundError } from '../../infrastructure/utils';
import {
  ErrorCode,
  ErrorMessage,
  IFilter,
  IListReturn,
  IUser,
  IUserLoginResponse,
  IUserRepository,
  IUserService
} from '../domain';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  private generateToken(user: IUser): string {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    return jwt.sign(payload, getEnvVariableValue('JWT_SECRET'), {
      expiresIn: getEnvVariableValue('JWT_EXPIRES_IN')
    });
  }

  async getAll(filter: IFilter<IUser>): Promise<IListReturn<IUser>> {
    return await this.userRepository.getAll(filter);
  }

  async login(data: Pick<IUser, 'username' | 'password'>): Promise<IUserLoginResponse> {
    const user = await this.userRepository.findUserByUsernameOrEmail({ username: data.username });

    if (!user) {
      throw new NotFoundError(ErrorMessage.USER_NOT_FOUND, { code: ErrorCode.USER_NOT_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundError(ErrorMessage.USER_NOT_FOUND, { code: ErrorCode.USER_NOT_FOUND });
    }

    const userInfo = {
      email: user.email,
      id: user.id,
      username: user.username
    } as IUser;

    const token = this.generateToken(user);

    return { token, user: userInfo };
  }

  async register(
    data: Pick<IUser, 'username' | 'email' | 'password'>
  ): Promise<IUserLoginResponse> {
    const userExists = await this.userRepository.findUserByUsernameOrEmail({
      username: data.username,
      email: data.email
    });

    if (userExists) {
      if (userExists.email === data.email)
        throw new BadRequestError(ErrorMessage.USER_EMAIL_EXISTS, {
          code: ErrorCode.USER_EMAIL_EXISTS
        });
      else
        throw new BadRequestError(ErrorMessage.USER_NAME_EXISTS, {
          code: ErrorCode.USER_NAME_EXISTS
        });
    }

    const password = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password
    } as IUser);

    const userInfo = {
      email: user.email,
      id: user.id,
      username: user.username
    } as IUser;

    const token = this.generateToken(user);

    return { token, user: userInfo };
  }

  async refreshToken(userId: number): Promise<string> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(ErrorMessage.USER_NOT_FOUND, { code: ErrorCode.USER_NOT_FOUND });
    }

    return this.generateToken(user);
  }

  async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(ErrorMessage.USER_NOT_FOUND, { code: ErrorCode.USER_NOT_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new NotFoundError(ErrorMessage.INVALID_PASSWORD, { code: ErrorCode.INVALID_PASSWORD });
    }

    const password = await bcrypt.hash(newPassword, 10);

    await this.userRepository.changePassword(userId, password);
  }

  async changeStatus(userId: number): Promise<void> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundError(ErrorMessage.USER_NOT_FOUND, { code: ErrorCode.USER_NOT_FOUND });
    }

    await this.userRepository.changeStatus(user.id, user.status ? 0 : 1);
  }
}
