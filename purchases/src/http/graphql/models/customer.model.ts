import { Field, ID, ObjectType } from "@nestjs/graphql";
import { PurchaseModel } from "./purchase.model";

@ObjectType()
export class CustomerModel {
  @Field(() => ID)
  id: string;

  @Field(() => [PurchaseModel])
  purchases: PurchaseModel[];
}
