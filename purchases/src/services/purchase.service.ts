import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreatePurchaseDto } from "./dtos/create-purchase.dto";

@Injectable()
export class PurchaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreatePurchaseDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const purchase = await this.prismaService.purchase.create({
      data: dto,
    });

    return purchase;
  }

  async findMany() {
    const purchases = await this.prismaService.purchase.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return purchases;
  }

  async findUnique(id: string) {
    return await this.prismaService.purchase.findUnique({
      where: { id },
    });
  }
}
