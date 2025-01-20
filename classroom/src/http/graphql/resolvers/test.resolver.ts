import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/authorization/authorization.guard";
import { PrismaService } from "src/database/prisma/prisma.service";

@Resolver()
export class TestResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  async hello() {
    return "Hello World";
  }
}
