import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  take?: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Min(1)
  skip?: number;
}
