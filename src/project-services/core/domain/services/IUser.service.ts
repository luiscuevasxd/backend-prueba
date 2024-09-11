import { IFilter, IListReturn, IUser } from '../entities';

export interface IUserLoginResponse {
  token: string;
  user: IUser;
}

export interface IUserService {
  getAll(filter: IFilter<IUser>): Promise<IListReturn<IUser>>;
  login(data: Pick<IUser, 'username' | 'password'>): Promise<IUserLoginResponse>;
  register(data: Pick<IUser, 'username' | 'email' | 'password'>): Promise<IUserLoginResponse>;
  refreshToken(userId: number): Promise<string>;
  changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void>;
  changeStatus(userId: number): Promise<void>;
}
