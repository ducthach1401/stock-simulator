import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { CheckRevokedTokenUsecase } from '../../domain/usecases/auth-token/check-revoked-token-usecase';
import { METADATA_KEY_PUBLIC } from '../decorators/metadata';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly checkRevokedUsecase: CheckRevokedTokenUsecase,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      METADATA_KEY_PUBLIC,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    try {
      const token = req.headers['authorization'].split(' ')[1];
      if (!(await this.checkRevokedUsecase.call(token))) {
        return false;
      }
    } catch (error) {
      return false;
    }

    return (await super.canActivate(context)) as boolean;
  }
}
