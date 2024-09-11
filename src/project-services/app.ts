import cors from '@fastify/cors';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import fastify from 'fastify';
import { print } from 'graphql';
import mercurius from 'mercurius';
import { join } from 'path';
import { connectPostgres } from './infrastructure/adapters';
import { seed } from './infrastructure/adapters/models/seeds';
import { registerAppRoutes } from './infrastructure/presentations';
import { resolvers } from './infrastructure/resolvers';
import {
  authorizeContextGraphql,
  errorFormatter,
  schemaErrorFormatter,
  validatorCompiler
} from './infrastructure/utils';

function loadSchemaFiles(): string {
  const directory = join(__dirname, `./infrastructure/schemas`);

  const typesArray = loadFilesSync(directory, { extensions: ['gql'] });
  const typeDefs = mergeTypeDefs(typesArray);
  return print(typeDefs);
}

const app = fastify();
app.register(registerAppRoutes);
app.setValidatorCompiler(validatorCompiler);
app.setErrorHandler(errorFormatter);
app.setSchemaErrorFormatter(schemaErrorFormatter);
app.register(cors);
app.register(mercurius, {
  schema: loadSchemaFiles(),
  resolvers,
  graphiql: true,
  context: authorizeContextGraphql
});

const port = Number(process.env.PROJECT_SERVICES_PORT ?? 3000);

const database = async () => {
  await connectPostgres();
  await seed();
};

app.listen({ port, host: '0.0.0.0' }, (err, address) => {
  database();

  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`app listening at ${address}`);
});

export default app;
