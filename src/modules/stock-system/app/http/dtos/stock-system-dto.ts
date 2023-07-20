import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { PaginationParamsDto } from 'src/core/dtos/pagination-params-dto';
import { SortParamsDto } from 'src/core/dtos/sort-params-dto';
import { parseBoolean } from 'src/core/helpers/utils';

export class GetStockParamsDto {
  @ApiProperty()
  @IsString()
  name!: string;
}

export class GetMyStocksQueryDto extends IntersectionType(
  PaginationParamsDto,
  SortParamsDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code: string | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value: any) => parseBoolean(value.obj?.is_exists, false))
  @IsBoolean()
  is_exists: boolean | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  from_time: Date | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  to_time: Date | undefined;
}

export class GetMyStockParamsDto {
  @ApiProperty()
  @IsString()
  id!: number;
}
