import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PurchaseService } from "src/services/purchase.service";
import { PurchaseModel } from "../models/purchase.model";
import { UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "src/http/authorization/authorization.guard";
import { ProductService } from "src/services/product.service";

@Resolver(() => PurchaseModel)
export class PurchaseResolver {
  constructor(
    private readonly pruchaseService: PurchaseService,
    private readonly productService: ProductService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [PurchaseModel])
  async listPurchases() {
    return await this.pruchaseService.findMany();
  }

  @ResolveField(() => PurchaseModel)
  async product(@Parent() purchase: PurchaseModel) {
    return await this.productService.findUnique(purchase.productId);
  }
}
