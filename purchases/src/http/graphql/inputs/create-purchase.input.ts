import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreatePuchaseInput {
  @Field()
  productId: string;
}
