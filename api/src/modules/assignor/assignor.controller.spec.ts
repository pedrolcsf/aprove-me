import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../../prisma.service';
import { AssignorController } from './assignor.controller';

const fakeAssignors = {
  assignors: [
    {
      id: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
      document: 'document',
      email: 'email@email.com',
      phone: '999999999',
      name: 'Name',
      payables: [],
    },
    {
      id: 'a295dfdf-a432-443d-9018-df9b93add7c4',
      document: 'document2',
      email: 'email2@email.com',
      phone: '999999998',
      name: 'Name 2',
      payables: [],
    },
  ],
};

const createAssignor = {
  id: '6f5ea472-09ae-4f09-89be-187f6dd715ec',
  document: 'newdocument',
  email: 'newdocument@email.com',
  phone: '123456789',
  name: 'new name',
};

const updateAssignor = {
  id: '6f5ea472-09ae-4f09-89be-187f6dd715ec',
  document: 'updateddocument',
  email: 'updateddocument@email.com',
  phone: '223456789',
  name: 'updated name',
};
describe('AssignorController', () => {
  let controller: AssignorController;
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService, PrismaService],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    service = module.get<AssignorService>(AssignorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Assignor', () => {
    it(`should be able to create a new assignor`, async () => {
      const assignorDto = {
        id: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
        document: 'document',
        email: 'email@email.com',
        phone: '999999999',
        name: 'Name',
      };

      const createdAssignor = {
        ...createAssignor,
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdAssignor);

      const result = await controller.createAssignor(assignorDto);

      expect(result).toBe(createdAssignor);
      expect(service.create).toHaveBeenCalledWith(assignorDto);
    });

    it(`should be able to return a single assignor`, async () => {
      const assignor = {
        id: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
        document: 'document',
        email: 'email@email.com',
        phone: '999999999',
        name: 'Name',
      };

      jest.spyOn(service, 'listOne').mockResolvedValue({
        assignor: {
          ...assignor,
          payables: [],
        },
      });

      const result = await controller.listAssignor(
        '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
      );

      expect(result).toEqual({
        assignor: {
          ...assignor,
          payables: [],
        },
      });
    });

    it(`should be able to return a array of assignors`, async () => {
      const assignor = {
        id: '12414ddb-bf3e-4bb3-9f93-3f7ba7084dfa',
        document: 'document',
        email: 'email@email.com',
        phone: '999999999',
        name: 'Name',
      };

      jest.spyOn(service, 'list').mockResolvedValue({
        count: 1,
        assignors: [
          {
            ...assignor,
          },
        ],
      });

      const result = await controller.listAssignors(1, 10);

      expect(result).toEqual({
        count: 1,
        assignors: [
          {
            ...assignor,
          },
        ],
      });
    });

    it(`should be able to update a assignor`, async () => {
      jest
        .spyOn(service, 'update')
        .mockResolvedValue({ assignor: updateAssignor });

      const result = await controller.updateAssignor(
        updateAssignor.id,
        updateAssignor,
      );

      console.log(result);

      expect(result).toEqual({ assignor: updateAssignor });
    });

    it(`should be able to delete a assignor`, async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(updateAssignor);

      const result = await controller.deleteAssignor(updateAssignor.id);

      console.log(result);

      expect(result).toEqual(updateAssignor);
    });
  });
});
