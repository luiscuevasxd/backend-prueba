import { FindOptionsWhere, Like } from 'typeorm';
import { IFilter, IListReturn, IModelTypes, IUser, IUserRepository } from '../../../core/domain';
import { User } from '../models';

export class UserRepository implements IUserRepository {
  constructor(private readonly models: IModelTypes) {}

  async getById(userId: number): Promise<IUser | null> {
    const userRepository = this.models.getRepository(User);

    return userRepository.findOneBy({ id: userId });
  }

  async findUserByUsernameOrEmail(filter: IFilter<IUser>): Promise<IUser | null> {
    const userRepository = this.models.getRepository(User);

    return userRepository.findOne({
      where: [{ username: filter.username }, { email: filter.email ?? filter.username }]
    });
  }

  async getAll({
    page,
    perPage,
    sortOrder,
    sortField,
    ...filter
  }: IFilter<IUser>): Promise<IListReturn<IUser>> {
    const userRepository = this.models.getRepository(User);

    const whereClause: FindOptionsWhere<User> = {};

    if (filter.username) {
      whereClause.username = Like(`%${filter.username}%`);
    }

    if (filter.email) {
      whereClause.email = Like(`%${filter.email}%`);
    }

    if (filter.status) {
      whereClause.status = filter.status;
    }

    const users = await userRepository.findAndCount({
      where: filter.search
        ? [
            { ...whereClause, username: Like(`%${filter.search}%`) },
            { ...whereClause, email: Like(`%${filter.search}%`) }
          ]
        : whereClause,
      skip: ((page ?? 1) - 1) * (perPage ?? 100),
      take: perPage ?? 100,
      order: {
        [sortField ?? 'createdAt']: sortOrder ?? 'desc'
      }
    });

    return {
      data: users[0].map(({ password, ...user }) => user as IUser),
      metaData: {
        page: page ?? 1,
        perPage: perPage ?? 100,
        totalCount: users[1]
      }
    };
  }

  async create({ username, email, password, status }: IUser): Promise<IUser> {
    const userRepository = this.models.getRepository(User);

    return userRepository.save({ username, email, password, status: status ?? 1 });
  }

  async changePassword(userId: number, password: string): Promise<void> {
    const userRepository = this.models.getRepository(User);

    await userRepository.update({ id: userId }, { password });
  }

  async changeStatus(userId: number, status: number): Promise<void> {
    const userRepository = this.models.getRepository(User);

    await userRepository.update({ id: userId }, { status });
  }
}
