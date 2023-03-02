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
  id: string;
}

export class ListExchangeQueryDto extends IntersectionType(
  PaginationParamsDto,
  SortParamsDto,
) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  from_time: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  to_time: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((value: any) => parseBoolean(value.obj?.has_finished, false))
  @IsBoolean()
  has_finished: boolean;
}

export class CreateExchangeBodyDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @Type(() => Number)
  @IsPositive()
  volume: number;

  @ApiProperty()
  @Type(() => Number)
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsEnum(ExchangeType)
  type: ExchangeType;
}
