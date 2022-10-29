import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieCastResolver, MovieDetailResolver } from './resolver/movie.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./src/graphql/*.gql'],
      definitions: {
        path: join(process.cwd(), 'src/generated/graphql.ts'),
        outputAs: 'class',
      },
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MovieDetailResolver, MovieCastResolver],
})
export class AppModule { }
