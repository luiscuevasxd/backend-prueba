import { addSortFields, SchemaCompiler } from './schema';

const vehicleSortFields = [
  'id',
  'brand',
  'model',
  'price',
  'typeOperationVehicleId',
  'vehicleOwnerId',
  'status',
  'createdAt'
];

export const vehicleFilterSchema: SchemaCompiler['schema'] = {
  querystring: addSortFields(vehicleSortFields, {
    brand: { type: 'string' },
    model: { type: 'string' },
    price: { type: 'number' },
    typeOperationVehicleId: { type: 'number' },
    vehicleOwnerId: { type: 'number' },
    status: { type: 'number' }
  })
};

export const vehicleByIdSchema: SchemaCompiler['schema'] = {
  params: {
    required: ['id'],
    type: 'object',
    properties: {
      id: { type: 'number' }
    }
  }
};

export const vehicleCreateInputSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['brand', 'model', 'price', 'typeOperationVehicleId', 'vehicleOwnerId'],
    properties: {
      brand: { type: 'string' },
      model: { type: 'string' },
      price: { type: 'number' },
      typeOperationVehicleId: { type: 'number' },
      vehicleOwnerId: { type: 'number' }
    }
  }
};

export const vehicleUpdateSchema: SchemaCompiler['schema'] = {
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
      brand: { type: 'string' },
      model: { type: 'string' },
      price: { type: 'number' },
      typeOperationVehicleId: { type: 'number' },
      vehicleOwnerId: { type: 'number' }
    }
  }
};

export const vehicleChangeStatusInputSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  }
};
