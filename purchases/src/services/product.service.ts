import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import slugify from "slugify";

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateProductDto) {
    const { title } = dto;
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prismaService.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new ConflictException("product with same slug already registred");
    }

    const product = await this.prismaService.product.create({
      data: {
        title,
        slug,
      },
    });
    return product;
  }

  async findMany() {
    const products = await this.prismaService.product.findMany();
    return products;
  }

  async findUnique(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    return product;
  }
}
