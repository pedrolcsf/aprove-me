import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateAssignorDto {
  @IsNotEmpty()
  @MaxLength(30)
  document: string;

  @IsNotEmpty()
  @MaxLength(140)
  email: string;

  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @IsNotEmpty()
  @MaxLength(140)
  name: string;
}
