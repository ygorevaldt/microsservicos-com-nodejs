import { join } from "node:path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { EnrollmentResolver } from "./graphql/resolvers/enrollment.resolver";
import { StudentResolver } from "./graphql/resolvers/student.resolver";

import { CourseResolver } from "src/http/graphql/resolvers/course.resolver";
import { PrismaService } from "src/database/prisma/prisma.service";
import { DatabaseModule } from "src/database/database.module";
import { CourseService } from "src/services/course.service";
import { StudentService } from "src/services/student.service";
import { EnrollmentService } from "src/services/enrollment.service";

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
    CourseService,
    StudentService,
    EnrollmentService,
    CourseResolver,
    EnrollmentResolver,
    StudentResolver,
  ],
})
export class HttpModule {}
