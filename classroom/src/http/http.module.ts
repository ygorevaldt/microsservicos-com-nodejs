import { join } from "node:path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { TestResolver } from "src/http/graphql/resolvers/test.resolver";
import { PrismaService } from "src/database/prisma/prisma.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join("src", "database", "schema.gql"),
    }),
    DatabaseModule,
  ],
  providers: [PrismaService, TestResolver],
})
export class HttpModule {}
