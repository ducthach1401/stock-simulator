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
import { ApiProperty, PickType } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  username: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  name: string;
}

export class UpdatePasswordUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @MinLength(6)
  password: string;
}

export class UserListQuery {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sort: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(SortDir)
  dir: SortDir;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;
}

export class UserIdParam {
  @ApiProperty()
  @IsString()
  id: string;
}

export class AdminIdParam extends PickType(UserIdParam, ['id']) {}
export class AddBalanceBody {
  @ApiProperty()
  @Min(1000)
  @IsInt()
  @Type(() => Number)
  amount_balance: number;
}
