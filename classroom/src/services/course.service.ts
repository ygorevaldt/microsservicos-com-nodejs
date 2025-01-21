import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";
import { CreateCourseDto } from "./dtos/create-course.dto";

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateCourseDto) {
    const courseAlreadyRegistred = await this.prismaService.course.findUnique({
      where: {
        slug: dto.slug,
      },
    });

    if (courseAlreadyRegistred) {
      throw new ConflictException("Course already registred");
    }

    const course = await this.prismaService.course.create({
      data: dto,
    });
    return course;
  }

  async findMany() {
    const courses = await this.prismaService.course.findMany();
    return courses;
  }

  async findUniqueById(id: string) {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });

    return course;
  }

  async findUniqueBySlug(slug: string) {
    const course = await this.prismaService.course.findUnique({
      where: { slug },
    });

    if (!course) {
      throw new NotFoundException("Course not registred");
    }

    return course;
  }
}
