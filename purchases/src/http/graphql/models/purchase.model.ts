import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ProductModel } from "./product.model";

enum PurchaseStatus {
  pending = "pending",
  approved = "approved",
  failed = "failed",
}

registerEnumType(PurchaseStatus, {
  name: "PurchaseStatus",
  description: "Available purchase statuses",
});

@ObjectType()
export class PurchaseModel {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => ProductModel)
  product: ProductModel;

  productId: string;
}
