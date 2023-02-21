import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { Public } from 'src/modules/auth/app/decorators/metadata';
import { RegisterUserDto } from '../../dtos/user-dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RegisterUserUsecase } from 'src/modules/user/domain/usecases/user/register-user-usecase';
import { GetUserByUsernameUsecase } from 'src/modules/user/domain/usecases/user/get-user-by-username-usecase';

@ApiTags('User / Public')
@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly registerUserUsecase: RegisterUserUsecase,
    private readonly getUserByUsernameUsecase: GetUserByUsernameUsecase,
  ) {}

  @ApiResponse({ type: Boolean })
  @Public()
  @Post('register')
  async register(@Body() body: RegisterUserDto, @Res() res: Response) {
    const user = await this.getUserByUsernameUsecase.call(body.username);
    if (user) {
      throw new LogicalException(
        ErrorCode.USER_ALREADY_EXISTS,
        'Username already exists',
        undefined,
      );
    }
    await this.registerUserUsecase.call(
      body.name,
      body.username,
      body.password,
    );
    res.status(HttpStatus.OK).json(true);
  }
}
