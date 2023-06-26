import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  login: string;

  @IsOptional()
  password: string;

  @ValidateIf((o) => 'password' in o)
  password_confirmation: string;
}
