import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleType } from 'src/core/enums/role-type';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { CheckUserPasswordUsecase } from 'src/modules/user/domain/usecases/check-user-password-usecase';
import { GetUserByUsernameUsecase } from 'src/modules/user/domain/usecases/get-user-by-username-usecase';
import { TokenModel } from '../models/token-model';
import { SaveAuthTokenUsecase } from './auth-token/save-auth-token-usecase';

@Injectable()
export class LoginUsecase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly checkUserPasswordUsecase: CheckUserPasswordUsecase,
    private readonly getUserByUsernameUsecase: GetUserByUsernameUsecase,
    private readonly saveAuthTokenUsecase: SaveAuthTokenUsecase,
  ) {}

  async call(username: string, password: string): Promise<TokenModel> {
    const user = await this.getUserByUsernameUsecase.call(username);
    if (!user) {
      throw new LogicalException(
        ErrorCode.AUTH_LOGIN_FAILED,
        'Username or password wrong.',
        undefined,
      );
    }

    const check = await this.checkUserPasswordUsecase.call(user, password);
    if (!check) {
      throw new LogicalException(
        ErrorCode.AUTH_LOGIN_FAILED,
        'Username or password wrong.',
        undefined,
      );
    }

    const jwt = await this.jwtService.signAsync({
      user_id: user.id,
      role: RoleType.User,
    });

    await this.saveAuthTokenUsecase.call(user, jwt);
    return new TokenModel(jwt, 'JWT');
  }
}
