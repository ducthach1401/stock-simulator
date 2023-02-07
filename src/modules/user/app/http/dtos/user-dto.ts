import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SortDir } from 'src/core/enums/sort-dir';

export class RegisterUserDto {
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  name: string;

  @IsString()
  @MaxLength(30)
  @MinLength(3)
  username: string;

  @IsString()
  @MaxLength(30)
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(1)
  name: string;
}

export class UpdatePasswordUserDto {
  @IsString()
  @MaxLength(30)
  @MinLength(6)
  password: string;
}

export class UserListQuery {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit: number;

  @IsOptional()
  @IsString()
  sort: string;

  @IsOptional()
  @IsEnum(SortDir)
  dir: SortDir;

  @IsOptional()
  @IsString()
  search: string;
}

export class UserIdParam {
  @IsString()
  id: string;
}
