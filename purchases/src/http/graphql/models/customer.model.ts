import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { PurchaseModel } from "./purchase.model";

@ObjectType("User")
@Directive('@key(fields: "authUserId")')
export class CustomerModel {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [PurchaseModel])
  purchases: PurchaseModel[];
}
