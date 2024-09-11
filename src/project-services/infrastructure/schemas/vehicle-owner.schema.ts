import { addSortFields, SchemaCompiler } from './schema';

const vehicleOwnerSortFields = ['id', 'name', 'lastname', 'age', 'status', 'createdAt'];

export const vehicleOwnerFilterSchema: SchemaCompiler['schema'] = {
  querystring: addSortFields(vehicleOwnerSortFields, {
    name: { type: 'string' },
    lastname: { type: 'string' },
    age: { type: 'number' },
    status: { type: 'number' }
  })
};

export const vehicleOwnerByIdSchema: SchemaCompiler['schema'] = {
  params: {
    required: ['id'],
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  }
};

export const vehicleOwnerCreateInputSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['name', 'lastname'],
    properties: {
      name: { type: 'string' },
      lastname: { type: 'string' },
      age: { type: 'number' }
    }
  }
};

export const vehicleOwnerUpdateSchema: SchemaCompiler['schema'] = {
  params: {
    required: ['id'],
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      lastname: { type: 'string' },
      age: { type: 'number' }
    }
  }
};

export const vehicleOwnerChangeStatusInputSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  }
};
