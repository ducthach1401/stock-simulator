import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { AddBalanceUsecase } from 'src/modules/user/domain/usecases/admin/add-balance-usecase';
import { DeleteUserUsecase } from 'src/modules/user/domain/usecases/admin/delete-user-usecase';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/user/get-user-usecase';
import { AddBalanceBody, UserIdParam } from '../../dtos/user-dto';

@ApiTags('Admin / User')
@ApiBearerAuth()
@Controller('api/v1/admin')
export class AdminController {
  constructor(
    private readonly addBalanceUsecase: AddBalanceUsecase,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly deleteUserUsecase: DeleteUserUsecase,
  ) {}

  private async checkAdmin(id: string): Promise<void> {
    const admin = await this.getUserUsecase.call(id, undefined);

    if (!admin) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }

    if (!admin.isAdmin) {
      throw new LogicalException(
        ErrorCode.USER_IS_NOT_PERMITTED,
        'User is not permitted.',
        undefined,
      );
    }
  }

  @Post('user/id/:id')
  async addBalance(
    @Req() req: any,
    @Param() param: UserIdParam,
    @Body() body: AddBalanceBody,
    @Res() res: Response,
  ) {
    await this.checkAdmin(req.user.user_id);

    const user = await this.getUserUsecase.call(param.id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }

    await this.addBalanceUsecase.call(user, body.amount_balance);

    res.status(HttpStatus.OK).json(true);
  }

  @Delete('user/id/:id')
  async deleteUser(
    @Req() req: any,
    @Param() param: UserIdParam,
    @Res() res: Response,
  ) {
    await this.checkAdmin(req.user.user_id);

    const user = await this.getUserUsecase.call(param.id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }

    await this.deleteUserUsecase.call(user);

    res.status(HttpStatus.OK).json(true);
  }
}
