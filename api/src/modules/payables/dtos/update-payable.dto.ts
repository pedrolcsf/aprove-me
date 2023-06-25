import { IsNotEmpty } from 'class-validator';

export class UpdatePayableDto {
  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  emissionDate: Date;

  @IsNotEmpty()
  assignorId: string;
}
