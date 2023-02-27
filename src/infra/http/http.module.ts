import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';

// import { DatabaseModule } from '@infra/database/database.module';
import { ComplexityPlugin } from '@infra/http/graphql/complexity-plugin';
import { ExampleResolver } from '@infra/http/graphql/resolvers/example.resolver';

import { JWTAuthGuard } from './auth/jwt-auth-guard';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    // DatabaseModule,

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      plugins: [new ComplexityPlugin(20)],
      cors: {
        credentials: true,
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders:
          'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
      },
    }),
  ],
  providers: [
    ExampleResolver,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
  ],
})
export class HttpModule {}
