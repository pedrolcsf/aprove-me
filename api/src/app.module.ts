import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PayableModule } from './modules/payables/payable.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClsModule.register({
      global: true,
      middleware: { mount: false },
    }),
    AssignorModule,
    PayableModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const middlewares = [ClsMiddleware, AuthMiddleware];
    consumer
      .apply(...middlewares)
      .exclude({ path: '/integrations/auth', method: RequestMethod.POST })
      .exclude({ path: '/integrations/users', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
