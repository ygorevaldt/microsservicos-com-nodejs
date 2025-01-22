import { NotFoundException, UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "../../authorization/authorization.guard";
import { Parent, Query, ResolveField, Resolver, ResolveReference } from "@nestjs/graphql";
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
    const customer = await this.customerService.findUniqueByAuthId(user.sub);
    if (!customer) {
      throw new NotFoundException("Customer is not registred");
    }

    return customer;
  }

  @ResolveField()
  async purchases(@Parent() customer: CustomerModel) {
    return await this.purchaseService.findManyFromCustomer(customer.id);
  }

  @ResolveReference()
  async resolveReferece(reference: { __typename: string; authUserId: string }) {
    return await this.customerService.findUniqueByAuthId(reference.authUserId);
  }
}
