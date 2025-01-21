import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreatePurchaseDto } from "./dtos/create-purchase.dto";
import { KafkaService } from "src/messaging/kafka.service";

@Injectable()
export class PurchaseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly kafkaService: KafkaService,
  ) {}

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

    const { authUserId } = await this.prismaService.customer.findUnique({
      where: { id: dto.customerId },
    });

    this.kafkaService.emit("purchase.created", {
      customer: { authUserId },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
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

  async findManyFromCustomer(customerId: string) {
    const purchases = await this.prismaService.purchase.findMany({
      where: { customerId },
    });

    return purchases;
  }

  async findUnique(id: string) {
    return await this.prismaService.purchase.findUnique({
      where: { id },
    });
  }
}
