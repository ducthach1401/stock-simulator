import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/get-user-usecase';
import { GetUsersUsecase } from 'src/modules/user/domain/usecases/get-users-usecase';
import { UpdateUserPasswordUsecase } from 'src/modules/user/domain/usecases/update-user-password-usecase';
import { UpdateUserUsecase } from 'src/modules/user/domain/usecases/update-user-usecase';
import {
  UpdatePasswordUserDto,
  UpdateUserDto,
  UserIdParam,
  UserListQuery,
} from '../../dtos/user-dto';

@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly getUserUsecase: GetUserUsecase,
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly updateUserPasswordUsecase: UpdateUserPasswordUsecase,
    private readonly getUsersUsecase: GetUsersUsecase,
  ) {}

  @Get('me')
  async getInfo(@Req() req: any, @Res() res: Response) {
    const result = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!result) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }
    res.status(HttpStatus.OK).json(result.toJson());
  }

  @Put('update')
  async update(
    @Req() req: any,
    @Body() body: UpdateUserDto,
    @Res() res: Response,
  ) {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found',
        undefined,
      );
    }

    await this.updateUserUsecase.call(user, body.name, undefined);
    res.status(HttpStatus.OK).json(true);
  }

  @Put('update/password')
  async password(
    @Req() req: any,
    @Body() body: UpdatePasswordUserDto,
    @Res() res: Response,
  ) {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found',
        undefined,
      );
    }

    await this.updateUserPasswordUsecase.call(user, body.password);
    res.status(HttpStatus.OK).json(true);
  }

  @Get()
  async list(
    @Req() req: any,
    @Query() query: UserListQuery,
    @Res() res: Response,
  ) {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }
    const users = await this.getUsersUsecase.call(
      user,
      new PaginationParams(query.page, query.limit),
      new SortParams(query.sort, query.dir),
      query.search,
    );
    res.status(HttpStatus.OK).json(users.map((user) => user.toJson()));
  }

  @Get('id/:id')
  async get(
    @Req() req: any,
    @Param() param: UserIdParam,
    @Res() res: Response,
  ) {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }
    const getUser = await this.getUserUsecase.call(param.id, undefined);
    res.status(HttpStatus.OK).json(getUser.toJson());
  }
}
