import { CanActivate, Injectable } from '@nestjs/common';
import { GetPayloadByTokenUsecase } from '../../domain/usecases/get-payload-by-token-usecase';

@Injectable()
export class SocketGuard implements CanActivate {
  constructor(
    private readonly getPayloadByTokenUsecase: GetPayloadByTokenUsecase,
  ) {}

  async canActivate(context: any): Promise<any> {
    let token = context.args[0].handshake.headers.authorization;
    if (!token) {
      return false;
    }
    token = token.split(' ')[1];
    const check = await this.getPayloadByTokenUsecase.call(token);
    if (!check) {
      return false;
    }
    return true;
  }
}
