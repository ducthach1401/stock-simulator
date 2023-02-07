import { ApiProperty } from '@nestjs/swagger';
export class AuthTokensModel {
  @ApiProperty()
  public readonly id: string;

  @ApiProperty({ name: 'user_id' })
  public readonly userId: string;

  @ApiProperty()
  public readonly token: string;

  @ApiProperty({ name: 'created_at' })
  public readonly createdAt: Date;

  @ApiProperty({ name: 'updated_at' })
  public readonly updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    token: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toJson(): Record<string, any> {
    return {
      id: this.id,
      user_id: this.userId,
      token: this.token,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
