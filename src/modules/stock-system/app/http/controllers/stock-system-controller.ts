import {
  CACHE_MANAGER,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Response } from 'express';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/user/get-user-usecase';

@Controller('api/v1/stock')
export class StockSystemController {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly getUserUsecase: GetUserUsecase,
  ) {}

  @Get('all')
  async listStocks(@Req() req: any, @Res() res: Response) {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }

    const stocks = await this.cacheManager.get('all_stock');
    res.status(HttpStatus.OK).json(stocks);
  }

  @Get('name/:name')
  async getStock(@Req() req: any, @Param() param: any, @Res() res: Response) {
    const user = await this.getUserUsecase.call(req.user.user_id, undefined);
    if (!user) {
      throw new LogicalException(
        ErrorCode.USER_NOT_FOUND,
        'User not found.',
        undefined,
      );
    }

    const stock = await this.cacheManager.get(param.name);
    res.status(HttpStatus.OK).json(stock);
  }
}
