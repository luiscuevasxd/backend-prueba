import { addSortFields, SchemaCompiler } from './schema';

const userSortFields = ['id', 'username', 'email', 'status', 'createdAt'];

export const userFilterSchema: SchemaCompiler['schema'] = {
  querystring: addSortFields(userSortFields, {
    username: { type: 'string' },
    email: { type: 'string' },
    status: { type: 'number' }
  })
};

export const userLoginInputSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' }
    }
  }
};

export const userRegisterInputSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
      username: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' }
    }
  }
};

export const userChangePasswordInputSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['newPassword', 'oldPassword'],
    properties: {
      newPassword: { type: 'string' },
      oldPassword: { type: 'string' }
    }
  }
};

export const userChangeStatusInputSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  }
};
