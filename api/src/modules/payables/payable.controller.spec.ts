import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { format } from 'date-fns';
describe('PayableController', () => {
  let controller: PayableController;
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [PayableService, PrismaService],
    }).compile();

    controller = module.get<PayableController>(PayableController);
    service = module.get<PayableService>(PayableService);
  });

  it('should create a payable', async () => {
    const payableDto = {
      id: '33f48f73-be98-487b-8558-5e72ca6df787',
      value: 80,
      emissionDate: new Date(),
      assignorId: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
    };

    const createdPayable = {
      ...payableDto,
    };
    jest.spyOn(service, 'create').mockResolvedValue(createdPayable);

    const result = await controller.createPayable(payableDto);

    expect(result).toBe(createdPayable);
    expect(service.create).toHaveBeenCalledWith(payableDto);
  });

  it('should not be able to create payable if failed', async () => {
    const payableDto = {
      id: '33f48f73-be98-487b-8558-5e72ca6df787',
      value: 80,
      emissionDate: new Date(),
      assignorId: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
    };

    jest.spyOn(service, 'create').mockRejectedValue(new NotFoundException());

    await expect(controller.createPayable(payableDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should able to list a single payable', async () => {
    const payable = {
      id: '33f48f73-be98-487b-8558-5e72ca6df787',
      value: 80,
      emissionDate: new Date(),
      assignorId: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
    };

    jest.spyOn(service, 'listOne').mockResolvedValue({
      payable: payable,
    });

    const result = await controller.listOne(
      '33f48f73-be98-487b-8558-5e72ca6df787',
    );

    expect(result).toEqual({ payable });
  });

  it('should able to list a array payables', async () => {
    const payable = {
      id: '33f48f73-be98-487b-8558-5e72ca6df787',
      value: 80,
      emissionDate: new Date(),
      emissionDateFiltered: format(new Date(), 'dd/MM/yyyy'),
      assignorId: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
    };

    jest.spyOn(service, 'list').mockResolvedValue({
      count: 1,
      payables: [
        {
          ...payable,
        },
      ],
    });

    const result = await controller.list(1, 10);

    expect(result).toEqual({
      count: 1,
      payables: [
        {
          ...payable,
        },
      ],
    });
  });

  it('should able to update a payable', async () => {
    const payableDto = {
      id: '33f48f73-be98-487b-8558-5e72ca6df787',
      value: 80,
      emissionDate: new Date(),
      emissionDateFiltered: format(new Date(), 'dd/MM/yyyy'),
      assignorId: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
    };

    const createdPayable = {
      ...payableDto,
    };
    jest
      .spyOn(service, 'update')
      .mockResolvedValue({ payable: createdPayable });

    const result = await controller.updatePayable(payableDto.id, payableDto);

    expect(result).toEqual({ payable: createdPayable });
  });

  it('should able to delete a payable', async () => {
    const payableDto = {
      id: '33f48f73-be98-487b-8558-5e72ca6df787',
      value: 80,
      emissionDate: new Date(),
      emissionDateFiltered: format(new Date(), 'dd/MM/yyyy'),
      assignorId: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
    };

    const createdPayable = {
      ...payableDto,
    };
    jest.spyOn(service, 'delete').mockResolvedValue(createdPayable);

    const result = await controller.delete(payableDto.id);

    expect(result).toEqual(createdPayable);
  });
});
