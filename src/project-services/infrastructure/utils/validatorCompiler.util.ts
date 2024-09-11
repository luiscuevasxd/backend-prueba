import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import type { FastifySchema } from 'fastify';
import type { FastifyRouteSchemaDef } from 'fastify/types/schema';

const ajv = new Ajv({
  removeAdditional: 'all',
  useDefaults: true,
  coerceTypes: 'array'
});

addFormats(ajv);

export const validatorCompiler = ({ schema }: FastifyRouteSchemaDef<FastifySchema>) =>
  ajv.compile(schema);
