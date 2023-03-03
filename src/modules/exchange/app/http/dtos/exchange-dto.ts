import {
  ApiProperty,
  ApiPropertyOptional,
  IntersectionType,
} from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaginationParamsDto } from 'src/core/dtos/pagination-params-dto';
import { SortParamsDto } from 'src/core/dtos/sort-params-dto';
import { parseBoolean } from 'src/core/helpers/utils';
import { ExchangeType } from 'src/modules/exchange/domain/enums/exchange-type';

export class ExchangeIdParam {
  @ApiProperty()
  @IsString()
  id!: string;
}

export class ListExchangeQueryDto extends IntersectionType(
  PaginationParamsDto,
  SortParamsDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search: string | undefined;

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

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value: any) => parseBoolean(value.obj?.has_finished, false))
  @IsBoolean()
  has_finished: boolean | undefined;
}

export class CreateExchangeBodyDto {
  @ApiProperty()
  @IsString()
  @Transform((value: any) => String(value.obj?.code).toUpperCase())
  code!: string;

  @ApiProperty()
  @Type(() => Number)
  @IsPositive()
  volume!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsPositive()
  price!: number;

  @ApiProperty()
  @IsEnum(ExchangeType)
  type!: ExchangeType;
}
