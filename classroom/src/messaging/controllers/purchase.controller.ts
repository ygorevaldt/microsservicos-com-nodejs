import { Controller, NotFoundException } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { PurchaseCreatedPayload } from "./types/purchase-created-payload.type";
import { StudentService } from "src/services/student.service";
import { CourseService } from "src/services/course.service";
import { EnrollmentService } from "src/services/enrollment.service";

@Controller()
export class PurchaseController {
  constructor(
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
    private readonly enrollmentService: EnrollmentService,
  ) {}

  @EventPattern("purchase.created")
  async created(@Payload() { customer, product }: PurchaseCreatedPayload) {
    let student = await this.studentService.findUniqueAuthId(customer.authUserId);
    if (!student) {
      student = await this.studentService.create({ authUserId: customer.authUserId });
    }

    let course = await this.courseService.findUniqueBySlug(product.slug);
    if (!course) {
      course = await this.courseService.create({
        slug: product.slug,
        title: product.title,
      });
    }

    const enrollment = await this.enrollmentService.create({
      courseId: course.id,
      studentId: student.id,
    });

    return enrollment;
  }
}
