import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateStudentDto } from "./dtos/create-student.dto";

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ authUserId }: CreateStudentDto) {
    const student = await this.prismaService.student.create({
      data: { authUserId },
    });
    return student;
  }

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

    return student;
  }

  async findUniqueAuthId(authId: string) {
    const student = await this.prismaService.student.findUnique({
      where: { authUserId: authId },
    });

    return student;
  }
}
