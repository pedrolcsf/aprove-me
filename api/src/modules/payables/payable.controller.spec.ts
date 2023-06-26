import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

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
});
