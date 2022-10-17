import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  Username: string;

  @IsEmail()
  @MaxLength(100)
  Email: string;

  @IsString()
  Password: string;

  @IsString()
  Fullname: string;
}
