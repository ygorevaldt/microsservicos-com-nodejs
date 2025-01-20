import { UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "../../authorization/authorization.guard";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CustomerModel } from "../models/customer.model";
import { CustomerService } from "src/services/customer.service";
import { AuthUser, CurrentUser } from "src/http/authorization/current-user.decorator";
import { PurchaseService } from "src/services/purchase.service";

@Resolver(() => CustomerModel)
export class CustomerResolver {
  constructor(
    private readonly customerService: CustomerService,
    private readonly purchaseService: PurchaseService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => CustomerModel)
  async me(@CurrentUser() user: AuthUser) {
    return await this.customerService.findUniqueByAuthId(user.sub);
  }

  @ResolveField()
  async purchases(@Parent() customer: CustomerModel) {
    return await this.purchaseService.findManyFromCustomer(customer.id);
  }
}
