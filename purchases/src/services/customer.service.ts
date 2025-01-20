import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateCustumerDto } from "./dtos/create-custumer.dto";

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ authUserId }: CreateCustumerDto) {
    const custumer = await this.prismaService.customer.create({
      data: {
        authUserId,
      },
    });

    return custumer;
  }

  async findUniqueById(id: string) {
    const custumer = await this.prismaService.purchase.findUnique({
      where: { id },
    });

    if (!custumer) {
      throw new NotFoundException("Custumer not found");
    }

    return custumer;
  }

  async findUniqueByAuthId(authId: string) {
    const custumer = await this.prismaService.customer.findUnique({
      where: {
        authUserId: authId,
      },
    });

    if (!custumer) {
      throw new NotFoundException("Custumer not found");
    }

    return custumer;
  }
}
