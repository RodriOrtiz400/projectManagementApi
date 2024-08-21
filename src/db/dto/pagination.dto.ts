import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  @ApiPropertyOptional({example: 25})
  limit?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({example: 0})
  skip? : number;
}