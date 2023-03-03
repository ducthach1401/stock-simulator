import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { GetAllStocksUsecase } from 'src/modules/stock-system/domain/usecases/get-all-stocks-usecase';
import { GetStockUsecase } from 'src/modules/stock-system/domain/usecases/get-stock-usecase';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/user/get-user-usecase';

@ApiTags('Stock / User')
@ApiBearerAuth()
@Controller('api/v1/stock')
export class StockSystemController {
  constructor(
    private readonly getUserUsecase: GetUserUsecase,
    private readonly getAllStocksUsecase: GetAllStocksUsecase,
    private readonly getStockUsecase: GetStockUsecase,
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

    const stocks = await this.getAllStocksUsecase.call();
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

    const stock = await this.getStockUsecase.call(param.name);
    res.status(HttpStatus.OK).json(stock);
  }
}
