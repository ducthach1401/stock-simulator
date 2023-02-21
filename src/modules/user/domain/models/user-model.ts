import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty()
  public readonly id: string;

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

  constructor(
    id: string,
    name: string,
    username: string,
    password: string,
    balance: number,
    capital: number,
    profit: number,
    isAdmin: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
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
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      balance: this.balance,
      capital: this.capital,
      profit: this.profit,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
