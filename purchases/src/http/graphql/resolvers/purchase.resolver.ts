import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PurchaseService } from "src/services/purchase.service";
import { PurchaseModel } from "../models/purchase.model";
import { UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "src/http/authorization/authorization.guard";
import { ProductService } from "src/services/product.service";
import { CreatePuchaseInput } from "../inputs/create-purchase.input";
import { AuthUser, CurrentUser } from "src/http/authorization/current-user.decorator";
import { CustumerService } from "src/services/custumer.service";

@Resolver(() => PurchaseModel)
export class PurchaseResolver {
  constructor(
    private readonly pruchaseService: PurchaseService,
    private readonly productService: ProductService,
    private readonly custumerService: CustumerService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Mutation(() => PurchaseModel)
  async createPurchase(@Args("input") input: CreatePuchaseInput, @CurrentUser() user: AuthUser) {
    const authUserId = user.sub;
    const custumer = await this.custumerService.findUniqueByAuthId(authUserId);

    return await this.pruchaseService.create({
      ...input,
      customerId: custumer.id,
    });
  }

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
