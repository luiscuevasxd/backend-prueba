import { IFilter, IListReturn, IUser } from '../../entities';

export interface IUserRepository {
  getById(userId: number): Promise<IUser | null>;
  findUserByUsernameOrEmail(filter: IFilter<IUser>): Promise<IUser | null>;
  getAll(args: IFilter<IUser>): Promise<IListReturn<IUser>>;
  create({ username, email, status }: IUser): Promise<IUser>;
  changePassword(userId: number, password: string): Promise<void>;
  changeStatus(userId: number, status: number): Promise<void>;
}
