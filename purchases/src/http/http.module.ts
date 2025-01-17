import { join } from "node:path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { ProductResolver } from "./graphql/resolvers/product.resolver";
import { PrismaService } from "src/database/prisma/prisma.service";
import { DatabaseModule } from "src/database/database.module";
import { ProductService } from "src/services/product.service";
import { PurchaseResolver } from "./graphql/resolvers/purchase.resolver";
import { PurchaseService } from "src/services/purchase.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join("src", "database", "schema.gql"),
    }),
    DatabaseModule,
  ],
  providers: [PrismaService, ProductService, PurchaseService, ProductResolver, PurchaseResolver],
})
export class HttpModule {}
