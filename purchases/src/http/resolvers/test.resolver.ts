import { Get, UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "../authorization/authorization.guard";
import { PrismaService } from "src/database/prisma/prisma.service";
import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class TestResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  async hello() {
    return "Hello World";
  }
}
