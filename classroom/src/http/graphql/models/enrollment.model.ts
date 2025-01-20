import { Field, ID, ObjectType } from "@nestjs/graphql";
import { StudentModel } from "./student.model";
import { CourseModel } from "./course.model";

@ObjectType()
export class EnrollmentModel {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  canceledAt: Date;

  @Field(() => StudentModel)
  student: StudentModel;

  studentId: string;

  @Field(() => CourseModel)
  course: CourseModel;

  courseId: string;
}
