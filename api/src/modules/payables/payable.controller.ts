import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePayableDto } from './dtos/create-payable.dto';
import { UpdatePayableDto } from './dtos/update-payable.dto';
import { PayableService } from './payable.service';

@Controller('/integrations/payable')
export class PayableController {
  constructor(private payableService: PayableService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createPayable(@Body() createPayableDto: CreatePayableDto) {
    return this.payableService.create(createPayableDto);
  }

  @Get()
  list(@Query('page') page: number, @Query('limit') limit: number) {
    return this.payableService.list(page, limit);
  }

  @Get(':id')
  listOne(@Param('id') id: string) {
    return this.payableService.listOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.payableService.delete(id);
  }

  @Put(':id')
  updatePayable(
    @Param('id') id: string,
    @Body() updatePayableDto: UpdatePayableDto,
  ) {
    return this.payableService.update(id, updatePayableDto);
  }
}
