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
import { CreateAssignorDto } from './dtos/create-assignor.dto';
import { AssignorService } from './assignor.service';
import { UpdateAssignorDto } from './dtos/update-assignor.dto';

@Controller('/integrations/assignor')
export class AssignorController {
  constructor(private assignorService: AssignorService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createAssignor(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }

  @Get()
  listAssignors(@Query('page') page: number, @Query('limit') limit: number) {
    return this.assignorService.list(page, limit);
  }

  @Get(':id')
  listAssignor(@Param('id') id: string) {
    return this.assignorService.listOne(id);
  }

  @Delete(':id')
  deleteAssignor(@Param('id') id: string) {
    return this.assignorService.delete(id);
  }

  @Put(':id')
  updateAssignor(
    @Param('id') id: string,
    @Body() updateAssignorDto: UpdateAssignorDto,
  ) {
    return this.assignorService.update(id, updateAssignorDto);
  }
}
