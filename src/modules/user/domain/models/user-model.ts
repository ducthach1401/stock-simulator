import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DomainModel } from 'src/core/models/domain-model';
import { ExchangeModel } from 'src/modules/exchange/domain/models/exchange-model';

export class UserModel extends DomainModel {
  @ApiProperty()
  public readonly id: number;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  public readonly username: string;

  @ApiProperty()
  public readonly password: string;

  @ApiProperty()
  public readonly balance: number;

  @ApiProperty()
  public readonly capital: number;

  @ApiProperty()
  public readonly profit: number;

  @ApiProperty({ name: 'is_admin' })
  public readonly isAdmin: boolean;

  @ApiProperty({ name: 'created_at' })
  public readonly createdAt: Date;

  @ApiProperty({ name: 'updated_at' })
  public readonly updatedAt: Date;

  @ApiPropertyOptional()
  public readonly exchange: ExchangeModel[] | undefined;

  constructor(
    id: number,
    name: string,
    username: string,
    password: string,
    balance: number,
    capital: number,
    profit: number,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date,
    exchange: ExchangeModel[] | undefined,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.balance = balance;
    this.capital = capital;
    this.profit = profit;
    this.isAdmin = isAdmin;
    this.exchange = exchange;
  }

  toJson(showHidden: boolean): Record<string, any> {
    return this.filterHiddenIfNeed(
      {
        id: this.id,
        name: this.name,
        balance: this.balance,
        capital: this.capital,
        profit: this.profit,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
        exchange: this.exchange?.map((model) => model.toJson(showHidden)),
      },
      showHidden,
    );
  }
}
