import { UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "../../authorization/authorization.guard";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProductModel } from "../models/product.model";
import { ProductService } from "src/services/product.service";
import { CreateProductInput } from "../inputs/create-product.input";

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [ProductModel])
  async listProducts() {
    return await this.productService.findMany();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => ProductModel)
  async createProduct(@Args("input") input: CreateProductInput) {
    return await this.productService.create(input);
  }
}
