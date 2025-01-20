import { Field, ID, ObjectType } from "@nestjs/graphql";
import { EnrollmentModel } from "./enrollment.model";

@ObjectType()
export class CourseModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field(() => [EnrollmentModel])
  enrollments: EnrollmentModel[];
}
