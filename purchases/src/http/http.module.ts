import { join } from "node:path";

import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { ProductResolver } from "./graphql/resolvers/product.resolver";
import { PrismaService } from "src/database/prisma/prisma.service";
import { DatabaseModule } from "src/database/database.module";
import { ProductService } from "src/services/product.service";
import { PurchaseResolver } from "./graphql/resolvers/purchase.resolver";
import { PurchaseService } from "src/services/purchase.service";
import { auth } from "express-oauth2-jwt-bearer";
import { CustumerService } from "src/services/custumer.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join("src", "database", "schema.gql"),
    }),
    DatabaseModule,
  ],
  providers: [
    PrismaService,
    ProductService,
    PurchaseService,
    CustumerService,
    ProductResolver,
    PurchaseResolver,
  ],
})
export class HttpModule {}
