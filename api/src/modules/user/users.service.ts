import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const userAlreadyExists = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException({
        message: 'user already exists',
      });
    }

    const hashPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        login,
        password: hashPassword,
      },
    });

    user.password = undefined;

    return { user };
  }

  async listUsers() {
    const users = await this.prisma.user.findMany();
    const newReturn = await users.map((i) => {
      i.password = undefined;

      return i;
    });

    return { users: newReturn };
  }

  async listById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'user does not exists',
      });
    }

    user.password = undefined;

    return { user };
  }
}
