import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MaxLength(30)
  @IsOptional()
  Username?: string;

  @IsEmail()
  @MaxLength(100)
  @IsOptional()
  Email?: string;

  @IsString()
  @IsOptional()
  Password?: string;

  @IsString()
  @IsOptional()
  Fullname?: string;

  @IsBoolean()
  IsPremium: boolean;

  @IsBoolean()
  Active: boolean;
}
