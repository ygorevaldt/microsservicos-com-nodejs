import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany() {
    const students = await this.prismaService.student.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return students;
  }

  async findUniqueById(id: string) {
    const student = await this.prismaService.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException("Student is not registred");
    }

    return student;
  }

  async findUniqueAuthId(authId: string) {
    const student = await this.prismaService.student.findUnique({
      where: { authUserId: authId },
    });

    if (!student) {
      throw new NotFoundException("Student is not registred");
    }

    return student;
  }
}
