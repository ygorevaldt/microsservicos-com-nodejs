import { NotFoundException, UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { StudentModel } from "../models/student.model";

import { AuthorizationGuard } from "src/http/authorization/authorization.guard";
import { StudentService } from "src/services/student.service";
import { EnrollmentService } from "src/services/enrollment.service";
import { EnrollmentModel } from "../models/enrollment.model";
import { AuthUser, CurrentUser } from "src/http/authorization/current-user.decorator";

@Resolver(() => StudentModel)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [StudentModel])
  @UseGuards(AuthorizationGuard)
  async listStudents() {
    return await this.studentService.findMany();
  }

  @ResolveField(() => [EnrollmentModel])
  async enrollments(@Parent() student: StudentModel) {
    return await this.enrollmentService.findManyByStudentId(student.id);
  }
}
