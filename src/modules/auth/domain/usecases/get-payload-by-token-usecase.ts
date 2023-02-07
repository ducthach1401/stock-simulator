import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';

@Injectable()
export class GetPayloadByTokenUsecase {
  constructor(private readonly jwtService: JwtService) {}

  async call(token: string): Promise<Record<string, any>> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      new LogicalException(ErrorCode.TOKEN_FAILED, 'Token failed.', undefined);
    }
  }
}
