import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { normalizeResponseData } from 'src/core/helpers/utils';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { GetAllStocksUsecase } from 'src/modules/stock-system/domain/usecases/get-all-stocks-usecase';
import { GetStockUsecase } from 'src/modules/stock-system/domain/usecases/get-stock-usecase';
import { GetTransactionStockUsecase } from 'src/modules/stock-system/domain/usecases/transactions/get-transaction-stock-usecase';
import { GetTransactionStocksUsecase } from 'src/modules/stock-system/domain/usecases/transactions/get-transaction-stocks-usecase';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/user/get-user-usecase';
import {
  GetMyStockParamsDto,
  GetMyStocksQueryDto,
  GetStockParamsDto,
} from '../dtos/stock-system-dto';

@ApiTags('Stock / User')
@ApiBearerAuth()
@Controller('api/v1/stock')
export class StockSystemController {
  constructor(
    private readonly getUserUsecase: GetUserUsecase,
    private readonly getAllStocksUsecase: GetAllStocksUsecase,
    private readonly getStockUsecase: GetStockUsecase,
    private readonly getTransactionStocksUsecase: GetTransactionStocksUsecase,
    private readonly getTransactionStockUsecase: GetTransactionStockUsecase,
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
  async getStock(
    @Req() req: any,
    @Param() param: GetStockParamsDto,
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

    const stock = await this.getStockUsecase.call(param.name);
    res.status(HttpStatus.OK).json(stock);
  }

  @Get('transaction/all')
  async getMyStocks(
    @Req() req: any,
    @Query() query: GetMyStocksQueryDto,
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

    const stocks = await this.getTransactionStocksUsecase.call(
      user,
      query.code,
      query.is_exists,
      new PaginationParams(
        query.page,
        query.limit,
        query.need_total_count,
        query.only_count,
      ),
      new SortParams(query.sort, query.dir),
      query.from_time,
      query.to_time,
    );

    res.status(HttpStatus.OK).json(normalizeResponseData(stocks));
  }

  @Get('transaction/id/:id')
  async getMyStock(
    @Req() req: any,
    @Param() param: GetMyStockParamsDto,
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

    const stock = await this.getTransactionStockUsecase.call(param.id);

    res.status(HttpStatus.OK).json(normalizeResponseData(stock));
  }
}
