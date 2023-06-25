import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePayableDto } from './dtos/create-payable.dto';
@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}

  async create(createPayableDto: CreatePayableDto) {
    const findAssignor = await this.prisma.assignor.findUnique({
      where: {
        id: createPayableDto.assignorId,
      },
    });

    if (!findAssignor) {
      throw new NotFoundException({
        message: 'assignor does not exists',
      });
    }

    createPayableDto.emissionDate = new Date(createPayableDto.emissionDate);
    return this.prisma.payable.create({
      data: createPayableDto,
    });
  }
}
