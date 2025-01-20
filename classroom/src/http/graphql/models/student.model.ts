import { Field, ID, ObjectType } from "@nestjs/graphql";
import { EnrollmentModel } from "./enrollment.model";

@ObjectType()
export class StudentModel {
  @Field(() => ID)
  id: string;

  @Field(() => [EnrollmentModel])
  enrollments: EnrollmentModel[];
}
