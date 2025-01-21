import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateEnrollmentDto } from "./dtos/create-enrollment.dto";

@Injectable()
export class EnrollmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateEnrollmentDto) {
    const enrollment = await this.prismaService.enrollment.create({ data });
    return enrollment;
  }

  async findMany() {
    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return enrollments;
  }

  async findManyByStudentId(studentId: string) {
    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return enrollments;
  }

  async findManyByCourseId(courseId: string) {
    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        courseId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return enrollments;
  }

  async findManyByCourseIdAndStudentId(courseId: string, studentId: string) {
    const enrollments = await this.prismaService.enrollment.findMany({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return enrollments;
  }
}
