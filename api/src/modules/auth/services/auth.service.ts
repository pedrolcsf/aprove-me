import { Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(userLogin: string, userPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { login: userLogin },
    });

    const passwordMatch = await compare(userPassword, user.password);

    if (user && passwordMatch) {
      return user;
    }

    return null;
  }

  async getPayload(user: any) {
    const [, token] = await user.headers.authorization.split('Bearer ');
    const decode = await this.jwtService.decode(token);
    return decode;
  }

  async listProfile(user: any) {
    const { id } = user.user;
    const findUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!findUser) {
      throw new NotFoundException();
    }

    findUser.password = undefined;

    return { user: findUser };
  }

  // async updateProfile(user: any, updateUserDto: UpdateUserDto) {
  //   const { id } = user.user;
  //   const findUser = await this.prisma.user.findUnique({
  //     where: { id },
  //   });

  //   if (!findUser) {
  //     throw new NotFoundException();
  //   }

  //   if (updateUserDto.username !== findUser.username) {
  //     const userExists = await this.prisma.user.findUnique({
  //       where: { username: updateUserDto.username },
  //     });

  //     if (userExists) {
  //       throw new UnauthorizedException({
  //         message: 'username already exists',
  //       });
  //     }

  //     findUser.username = updateUserDto.username;
  //   }

  //   if (updateUserDto.email !== findUser.email) {
  //     const userExists = await this.prisma.user.findUnique({
  //       where: { email: updateUserDto.email },
  //     });

  //     if (userExists) {
  //       throw new UnauthorizedException({
  //         message: 'email already exists',
  //       });
  //     }

  //     findUser.email = updateUserDto.email;
  //   }

  //   if (updateUserDto.password) {
  //     if (updateUserDto.password != updateUserDto.password_confirmation) {
  //       throw new UnauthorizedException({
  //         message: 'password confirmation does not match',
  //       });
  //     }

  //     const hashPassword = await hash(updateUserDto.password, 10);
  //     findUser.password = hashPassword;
  //   }

  //   findUser.name = updateUserDto.name;

  //   await this.prisma.user.update({
  //     where: { id },
  //     data: findUser,
  //   });

  //   return {
  //     user: {
  //       id: findUser.id,
  //       username: findUser.username,
  //       name: findUser.name,
  //       email: findUser.email,
  //     },
  //   };
  // }

  // async delete(user: any) {
  //   const { id } = user.user;
  //   const findUser = await this.prisma.user.findUnique({
  //     where: { id },
  //   });

  //   if (!findUser) {
  //     throw new NotFoundException();
  //   }

  //   await this.prisma.user.delete({
  //     where: { id },
  //   });

  //   return {
  //     message: 'successfully deleted user',
  //   };
  // }

  async login(user: any) {
    const payload = { login: user.login, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
