import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class CustumerService {
  constructor(private readonly prismaService: PrismaService) {}

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
