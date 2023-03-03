import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SortDir } from 'src/core/enums/sort-dir';
import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  name!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  username!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(6)
  password!: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  name: string | undefined;
}

export class UpdatePasswordUserDto {
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(6)
  password!: string;
}

export class UserListQuery {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit: number | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sort: string | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(SortDir)
  dir: SortDir | undefined;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search: string | undefined;
}

export class UserIdParam {
  @ApiProperty()
  @IsString()
  id!: string;
}

export class AdminIdParam extends PickType(UserIdParam, ['id']) {}
export class AddBalanceBody {
  @ApiProperty()
  @Min(1000)
  @IsInt()
  @Type(() => Number)
  amount_balance!: number;
}
