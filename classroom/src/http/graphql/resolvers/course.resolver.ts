import { NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "src/http/authorization/authorization.guard";
import { CourseModel } from "../models/course.model";
import { CourseService } from "src/services/course.service";
import { EnrollmentService } from "src/services/enrollment.service";
import { EnrollmentModel } from "../models/enrollment.model";
import { CreateCourseInput } from "../inputs/create-course.input";
import slugify from "slugify";
import { AuthUser, CurrentUser } from "src/http/authorization/current-user.decorator";
import { StudentService } from "src/services/student.service";

@Resolver(() => CourseModel)
export class CourseResolver {
  constructor(
    private readonly courseService: CourseService,
    private readonly enrollmentService: EnrollmentService,
    private readonly studentService: StudentService,
  ) {}

  @Mutation(() => CourseModel)
  @UseGuards(AuthorizationGuard)
  async createCourse(@Args("input") input: CreateCourseInput) {
    return await this.courseService.create({
      ...input,
      slug: slugify(input.title, { lower: true }),
    });
  }

  @Query(() => [CourseModel])
  @UseGuards(AuthorizationGuard)
  async listCourses() {
    return await this.courseService.findMany();
  }
  @Query(() => CourseModel)
  @UseGuards(AuthorizationGuard)
  async getCourse(@Args("id") id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.findUniqueAuthId(user.sub);
    if (!student) {
      throw new NotFoundException("Student is not registred");
    }

    const enrollments = await this.enrollmentService.findManyByCourseIdAndStudentId(id, student.id);
    if (!enrollments[0]) {
      throw new UnauthorizedException();
    }

    return await this.courseService.findUniqueById(id);
  }

  @ResolveField(() => [EnrollmentModel])
  async enrollments(@Parent() course: CourseModel) {
    return await this.enrollmentService.findManyByCourseId(course.id);
  }
}
