import {
  IUser,
  IUserChangePasswordSchema,
  IUserChangeStatusSchema,
  IUserFilterSchema
} from '../../core/domain';
import { userController } from '../di';

export const userResolver = {
  Query: {
    users: (_: void, data: { input: IUserFilterSchema['Querystring'] }) =>
      userController.getAllByResolver(_, data.input)
  },
  Mutation: {
    changePasswordUser: (
      _: void,
      data: { input: IUserChangePasswordSchema['Body'] },
      context: { user: IUser }
    ) => userController.changePasswordByResolver(_, data.input, context),
    changeStatusUser: (_: void, data: { input: IUserChangeStatusSchema['Body'] }) =>
      userController.changeStatusByResolver(_, data.input)
  }
};
