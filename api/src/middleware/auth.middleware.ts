import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ClsService } from 'nestjs-cls';
import { verify } from 'jsonwebtoken';
import { jwtConstants } from '../modules/auth/services/constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException();
    }
    const [, token] = await authorization.split('Bearer ');
    const tokenDecoded = verify(token, jwtConstants.secret);

    this.cls.set('url', req.originalUrl);
    this.cls.set('user_id', tokenDecoded.sub);
    this.cls.set('user_login', tokenDecoded['login']);
    next();
  }
}
