import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/graphql/*.gql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class',
});
