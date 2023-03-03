import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DomainModel } from 'src/core/models/domain-model';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { ExchangeType } from '../enums/exchange-type';

export class ExchangeModel extends DomainModel {
  @ApiProperty()
  public readonly id: string;

  @ApiProperty({ name: 'user_id' })
  public readonly userId: string;

  @ApiProperty()
  public readonly code: string;

  @ApiProperty()
  public readonly volume: number;

  @ApiProperty()
  public readonly price: number;

  @ApiProperty()
  public readonly type: ExchangeType;

  @ApiPropertyOptional({ name: 'matched_price' })
  public readonly matchedPrice: number | undefined;

  @ApiPropertyOptional({ name: 'finished_at' })
  public readonly finishedAt: Date | undefined;

  @ApiPropertyOptional({ name: 'created_at' })
  public readonly createdAt: Date;

  @ApiPropertyOptional({ name: 'updated_at' })
  public readonly updatedAt: Date;

  @ApiPropertyOptional()
  public readonly user: UserModel | undefined;

  constructor(
    id: string,
    userId: string,
    code: string,
    volume: number,
    price: number,
    type: ExchangeType,
    matchedPrice: number | undefined,
    finishedAt: Date | undefined,
    createdAt: Date,
    updatedAt: Date,
    user: UserModel | undefined,
  ) {
    super();
    this.id = id;
    this.userId = userId;
    this.code = code;
    this.volume = volume;
    this.price = price;
    this.matchedPrice = matchedPrice;
    this.type = type;
    this.finishedAt = finishedAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }

  toJson(showHidden: boolean): Record<string, any> {
    return this.filterHiddenIfNeed(
      {
        id: this.id,
        user_id: this.userId,
        code: this.code,
        volume: this.volume,
        price: this.price,
        type: this.type,
        matched_price: this.matchedPrice,
        finished_at: this.finishedAt,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
        user: this.user?.toJson(showHidden),
      },
      showHidden,
    );
  }
}
