import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePayableDto } from './dtos/create-payable.dto';
import { PayableService } from './payable.service';

@Controller('/integrations/payable')
export class PayableController {
  constructor(private payableService: PayableService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createPayable(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }
}
