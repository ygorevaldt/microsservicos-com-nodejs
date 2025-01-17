import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class PurchaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany() {
    const purchases = await this.prismaService.purchase.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return purchases;
  }

  async findUnique(id: string) {
    return await this.prismaService.product.findUnique({
      where: { id },
    });
  }
}
