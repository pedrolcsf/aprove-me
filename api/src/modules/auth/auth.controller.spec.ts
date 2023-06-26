import { Test } from '@nestjs/testing';
import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from '../../prisma.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, PrismaService],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('login', () => {
    it('should be able to make a login', async () => {
      const authCredentialsDto = {
        login: 'aprovame',
        password: 'aprovame',
      };
      const expectedToken = 'fakeToken';

      jest.spyOn(authService, 'login').mockImplementation(async () => {
        return {
          access_token: expectedToken,
        };
      });

      const result = await authController.login(authCredentialsDto);

      expect(result).toEqual({ access_token: expectedToken });
    });
  });
});
