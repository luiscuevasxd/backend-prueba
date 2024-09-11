import { FastifySchema, RouteShorthandOptions } from 'fastify';
import { PAGINATION } from '../utils';

export interface SchemaCompiler extends RouteShorthandOptions {
  schema: FastifySchema;
}

export const defaultQueryString = {
  page: { type: 'integer', minimum: 1, default: PAGINATION.DEFAULT_PAGE },
  perPage: {
    type: 'integer',
    minimum: 1,
    maximum: PAGINATION.MAX_PER_PAGE,
    default: PAGINATION.PER_PAGE
  },
  sortOrder: { enum: ['desc', 'asc'], default: 'asc' },
  sortField: { type: 'string', default: 'createdAt' },
  search: { type: 'string' }
};

export const commonParamId = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'integer', minimum: 1 }
  }
};

export function addSortFields(sortFields: string[], queryStringProperties?: unknown) {
  return {
    type: 'object',
    properties: {
      ...defaultQueryString,
      ...(queryStringProperties || {}),
      ...(sortFields?.length && { sortField: { enum: sortFields } })
    }
  };
}
