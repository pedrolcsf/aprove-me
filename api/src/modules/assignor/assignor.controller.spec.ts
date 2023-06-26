import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../../prisma.service';

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

describe('AssignorController', () => {
  let assignorService: AssignorService;
  let prismaService: PrismaService;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Assignor', () => {
    it(`should be able to create a new assignor`, async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AssignorService,
          {
            provide: PrismaService,
            useValue: {
              assignor: {
                create: jest.fn().mockResolvedValue(createAssignor),
                findUnique: jest.fn(),
              },
            },
          },
        ],
      }).compile();

      assignorService = module.get<AssignorService>(AssignorService);
      prismaService = module.get<PrismaService>(PrismaService);

      const response = await assignorService.create(createAssignor);

      expect(response).toEqual(createAssignor);
    });

    it(`should be able to return an array of assignors`, async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AssignorService,
          {
            provide: PrismaService,
            useValue: {
              assignor: {
                findMany: jest.fn().mockResolvedValue(fakeAssignors),
                count: jest
                  .fn()
                  .mockResolvedValue(fakeAssignors.assignors.length),
              },
            },
          },
        ],
      }).compile();

      assignorService = module.get<AssignorService>(AssignorService);
      prismaService = module.get<PrismaService>(PrismaService);

      const response = await assignorService.list(1, 10);

      expect(response).toEqual({
        count: fakeAssignors.assignors.length,
        assignors: fakeAssignors,
      });
      expect(prismaService.assignor.findMany).toHaveBeenCalledTimes(1);
      expect(prismaService.assignor.count).toHaveBeenCalledTimes(1);
    });

    it(`should be able to return a single assignor`, async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AssignorService,
          {
            provide: PrismaService,
            useValue: {
              assignor: {
                findUnique: jest
                  .fn()
                  .mockResolvedValue(fakeAssignors.assignors[0]),
              },
            },
          },
        ],
      }).compile();

      assignorService = module.get<AssignorService>(AssignorService);
      prismaService = module.get<PrismaService>(PrismaService);

      const response = await assignorService.listOne(
        fakeAssignors.assignors[0].id,
      );

      expect(response).toEqual({
        assignor: fakeAssignors.assignors[0],
      });
      expect(prismaService.assignor.findUnique).toHaveBeenCalledTimes(1);
    });

    it(`should be able to update a assignor`, async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AssignorService,
          {
            provide: PrismaService,
            useValue: {
              assignor: {
                findUnique: jest
                  .fn()
                  .mockResolvedValue(fakeAssignors.assignors[0]),
                update: jest.fn().mockResolvedValue(fakeAssignors.assignors[0]),
              },
            },
          },
        ],
      }).compile();

      assignorService = module.get<AssignorService>(AssignorService);
      prismaService = module.get<PrismaService>(PrismaService);

      const response = await assignorService.update(
        fakeAssignors.assignors[0].id,
        fakeAssignors.assignors[0],
      );

      expect(response).toEqual({
        assignor: fakeAssignors.assignors[0],
      });
      expect(prismaService.assignor.update).toHaveBeenCalledTimes(1);
    });

    it(`should be able to delete a assignor`, async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AssignorService,
          {
            provide: PrismaService,
            useValue: {
              assignor: {
                findUnique: jest
                  .fn()
                  .mockResolvedValue(fakeAssignors.assignors[0]),
                delete: jest.fn().mockResolvedValue(fakeAssignors.assignors[0]),
              },
            },
          },
        ],
      }).compile();

      assignorService = module.get<AssignorService>(AssignorService);
      prismaService = module.get<PrismaService>(PrismaService);

      const response = await assignorService.delete(
        fakeAssignors.assignors[0].id,
      );
      expect(response).toEqual(fakeAssignors.assignors[0]);
      expect(prismaService.assignor.delete).toHaveBeenCalledTimes(1);
    });
  });
});
