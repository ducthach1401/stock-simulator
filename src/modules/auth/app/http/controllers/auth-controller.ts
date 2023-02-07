import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { LoginUsecase } from 'src/modules/auth/domain/usecases/login-usecase';
import { Public } from '../../decorators/metadata';
import { LoginDto } from '../dtos/login-dto';
import { Response } from 'express';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';
import { LogicalException } from 'src/exceptions/logical-exception';
import { ErrorCode } from 'src/exceptions/error-code';
import { DeleteAuthTokenUsecase } from 'src/modules/auth/domain/usecases/auth-token/delete-auth-token-usecase';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly loginUsecase: LoginUsecase,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly deleteAuthTokenUsecase: DeleteAuthTokenUsecase,
  ) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const token = await this.loginUsecase.call(body.username, body.password);
    res.status(HttpStatus.OK).json(token.toJson());
  }

  @Delete('logout')
  async logout(@Req() req: any, @Res() res: Response) {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }
    const token = req.headers.authorization.split(' ')[1];
    await this.deleteAuthTokenUsecase.call(user, token);
    res.status(HttpStatus.OK).json(true);
  }

  @Delete('logout/all')
  async logoutAll(@Req() req: any, @Res() res: Response) {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }
    await this.deleteAuthTokenUsecase.call(user, undefined);
    res.status(HttpStatus.OK).json(true);
  }
}
