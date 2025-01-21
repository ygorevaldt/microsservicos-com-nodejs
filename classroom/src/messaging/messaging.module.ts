import { Module } from "@nestjs/common";
import { PurchaseController } from "./controllers/purchase.controller";
import { StudentService } from "src/services/student.service";
import { CourseService } from "src/services/course.service";
import { EnrollmentService } from "src/services/enrollment.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [PurchaseController],
  providers: [StudentService, CourseService, EnrollmentService],
})
export class MessagingModule {}
