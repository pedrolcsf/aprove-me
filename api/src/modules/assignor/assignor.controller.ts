import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAssignorDto } from './dtos/create-assignor.dto';
import { AssignorService } from './assignor.service';

@Controller('/integrations/assignor')
export class AssignorController {
  constructor(private assignorService: AssignorService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createAssignor(@Body() createAssignorDto: CreateAssignorDto) {
    return this.assignorService.create(createAssignorDto);
  }
}
