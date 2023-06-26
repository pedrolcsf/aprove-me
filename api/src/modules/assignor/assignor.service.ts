import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAssignorDto } from './dtos/create-assignor.dto';
import { UpdateAssignorDto } from './dtos/update-assignor.dto';
import { paginate } from 'nestjs-prisma-pagination';

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

  async list(page: number, limit: number) {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const query = paginate(
      {
        page: pageNumber,
        limit: limitNumber,
      },
      {
        orderBy: {},
      },
    );
    const assignorsCount = await this.prisma.assignor.count();
    const assignors = await this.prisma.assignor.findMany({
      ...query,
      include: { payables: true },
    });

    return { count: assignorsCount, assignors: assignors };
  }

  async listOne(id: string) {
    const assignor = await this.prisma.assignor.findUnique({
      where: { id },
      include: { payables: true },
    });

    if (!assignor) {
      throw new NotFoundException({
        message: 'assignor does not exists',
      });
    }

    return { assignor };
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    const assignor = await this.prisma.assignor.findUnique({
      where: { id },
    });

    if (!assignor) {
      throw new NotFoundException({
        message: 'assignor does not exists',
      });
    }

    const emailAlreadyExists = await this.prisma.assignor.findUnique({
      where: { email: updateAssignorDto.email },
    });

    if (emailAlreadyExists && emailAlreadyExists.email !== assignor.email) {
      throw new UnauthorizedException({
        message: 'email already exists',
      });
    }

    const documentAlreadyExists = await this.prisma.assignor.findUnique({
      where: { document: updateAssignorDto.document },
    });

    if (
      documentAlreadyExists &&
      documentAlreadyExists.document !== assignor.document
    ) {
      throw new UnauthorizedException({
        message: 'document already exists',
      });
    }

    const updateAssignor = await this.prisma.assignor.update({
      where: { id },
      data: updateAssignorDto,
    });

    return { assignor: updateAssignor };
  }

  async delete(id: string) {
    const assignor = await this.prisma.assignor.findUnique({
      where: { id },
    });

    if (!assignor) {
      throw new NotFoundException({
        message: 'assignor does not exists',
      });
    }

    return await this.prisma.assignor.delete({
      where: { id },
    });
  }
}
