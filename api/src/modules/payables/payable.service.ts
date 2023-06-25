import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePayableDto } from './dtos/create-payable.dto';
import { UpdatePayableDto } from './dtos/update-payable.dto';
import { paginate } from 'nestjs-prisma-pagination';
import { format } from 'date-fns';
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
    const payablesCount = await this.prisma.payable.count();
    const payables = await this.prisma.payable.findMany(query);

    const payableReturn = payables.map((i) => {
      return {
        ...i,
        emissionDateFiltered: format(new Date(i.emissionDate), 'dd/MM/yyyy'),
      };
    });
    return { count: payablesCount, payables: payableReturn };
  }

  async listOne(id: string) {
    const payable = await this.prisma.payable.findUnique({
      where: { id },
    });

    if (!payable) {
      throw new NotFoundException({
        message: 'payable does not exists',
      });
    }

    return { payable };
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    const payable = await this.prisma.payable.findUnique({
      where: { id },
    });

    if (!payable) {
      throw new NotFoundException({
        message: 'payable does not exists',
      });
    }

    const findAssignor = await this.prisma.assignor.findUnique({
      where: {
        id: updatePayableDto.assignorId,
      },
    });

    if (!findAssignor) {
      throw new NotFoundException({
        message: 'assignor does not exists',
      });
    }

    updatePayableDto.emissionDate = new Date(updatePayableDto.emissionDate);

    const updatePayable = await this.prisma.payable.update({
      where: { id },
      data: updatePayableDto,
    });

    return { payable: updatePayable };
  }

  async delete(id: string) {
    const payable = await this.prisma.payable.findUnique({
      where: { id },
    });

    if (!payable) {
      throw new NotFoundException({
        message: 'payable does not exists',
      });
    }

    return await this.prisma.payable.delete({
      where: { id },
    });
  }
}
