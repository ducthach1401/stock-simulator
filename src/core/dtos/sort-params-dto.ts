import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortDir } from 'src/core/enums/sort-dir';

export class SortParamsDto {
  @IsString()
  @IsOptional()
  sort: string | undefined;

  @Transform((value: any) => value.obj?.dir?.toUpperCase())
  @IsEnum(SortDir)
  @IsOptional()
  dir: SortDir | undefined;
}
