import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAssignorDto } from './dtos/create-assignor.dto';

@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignorDto: CreateAssignorDto) {
    const emailAlreadyExists = await this.prisma.assignor.findUnique({
      where: { email: createAssignorDto.email },
    });

    if (emailAlreadyExists) {
      throw new UnauthorizedException({
        message: 'assignor already exists',
      });
    }

    const documentAlreadyExists = await this.prisma.assignor.findUnique({
      where: { document: createAssignorDto.document },
    });

    if (documentAlreadyExists) {
      throw new UnauthorizedException({
        message: 'assignor already exists',
      });
    }

    return this.prisma.assignor.create({
      data: createAssignorDto,
    });
  }
}
