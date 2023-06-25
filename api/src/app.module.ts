import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AssignorModule } from './modules/assignor/assignor.module';
import { PayableModule } from './modules/payables/payable.module';

@Module({
  imports: [ConfigModule.forRoot(), AssignorModule, PayableModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
