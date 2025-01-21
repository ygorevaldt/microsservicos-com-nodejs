import { join } from "node:path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";

import { ProductResolver } from "./graphql/resolvers/product.resolver";
import { PrismaService } from "src/database/prisma/prisma.service";
import { DatabaseModule } from "src/database/database.module";
import { ProductService } from "src/services/product.service";
import { PurchaseResolver } from "./graphql/resolvers/purchase.resolver";
import { PurchaseService } from "src/services/purchase.service";
import { CustomerService } from "src/services/customer.service";
import { CustomerResolver } from "./graphql/resolvers/customer.resolver";
import { MessagingModule } from "src/messaging/messaging.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: join("src", "database", "schema.gql"),
    }),
    DatabaseModule,
    MessagingModule,
  ],
  providers: [
    PrismaService,
    ProductService,
    PurchaseService,
    CustomerService,
    ProductResolver,
    PurchaseResolver,
    CustomerResolver,
  ],
})
export class HttpModule {}
