import { ApiProperty } from '@nestjs/swagger';
export class TokenModel {
  @ApiProperty({ name: 'access_token' })
  public readonly accessToken: string;

  @ApiProperty({ name: 'token_type' })
  public readonly tokenType: string;

  constructor(accessToken: string, tokenType: string) {
    this.accessToken = accessToken;
    this.tokenType = tokenType;
  }

  toJson(): Record<string, any> {
    return {
      access_token: this.accessToken,
      token_type: this.tokenType,
    };
  }
}
