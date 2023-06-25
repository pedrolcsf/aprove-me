import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';

@Module({
  imports: [],
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
})
export class PayableModule {}
