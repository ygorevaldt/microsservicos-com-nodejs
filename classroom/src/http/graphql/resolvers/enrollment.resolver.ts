import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/authorization/authorization.guard";
import { EnrollmentModel } from "../models/enrollment.model";
import { EnrollmentService } from "src/services/enrollment.service";
import { StudentModel } from "../models/student.model";
import { CourseModel } from "../models/course.model";
import { CourseService } from "src/services/course.service";
import { StudentService } from "src/services/student.service";

@Resolver(() => EnrollmentModel)
export class EnrollmentResolver {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly courseService: CourseService,
    private readonly studentService: StudentService,
  ) {}

  @Query(() => [EnrollmentModel])
  @UseGuards(AuthorizationGuard)
  async listEnrollments() {
    return await this.enrollmentService.findMany();
  }

  @ResolveField(() => StudentModel)
  async student(@Parent() enrollment: EnrollmentModel) {
    return await this.studentService.findUniqueById(enrollment.studentId);
  }

  @ResolveField(() => CourseModel)
  async course(@Parent() enrollment: EnrollmentModel) {
    return await this.courseService.findUniqueById(enrollment.courseId);
  }
}
