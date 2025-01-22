import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { EnrollmentModel } from "./enrollment.model";

@ObjectType("User")
@Directive("@extends")
@Directive('@key(fields: "authUserId")')
export class StudentModel {
  id: string;

  @Field(() => ID)
  @Directive("@external")
  authUserId: string;

  @Field(() => [EnrollmentModel])
  enrollments: EnrollmentModel[];
}
