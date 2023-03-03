import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
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
import { CreateExchangeUsecase } from 'src/modules/exchange/domain/usecases/create-exchange-usecase';
import { GetExchangeUsecase } from 'src/modules/exchange/domain/usecases/get-exchange-usecase';
import { ListExchangeUsecase } from 'src/modules/exchange/domain/usecases/list-exchange-usecase';
import { MarkFinishedExchangeUsecase } from 'src/modules/exchange/domain/usecases/mark-finished-exchange-usecase';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/user/get-user-usecase';
import {
  CreateExchangeBodyDto,
  ExchangeIdParam,
  ListExchangeQueryDto,
} from '../dtos/exchange-dto';

@ApiTags('Exchange / User')
@ApiBearerAuth()
@Controller('api/v1/exchange')
export class ExchangeController {
  constructor(
    private readonly getExchangeUsecase: GetExchangeUsecase,
    private readonly listExchangeUsecase: ListExchangeUsecase,
    private readonly createExchangeUsecase: CreateExchangeUsecase,
    private readonly markFinishedExchangeUsecase: MarkFinishedExchangeUsecase,
    private readonly getUserUsecase: GetUserUsecase,
  ) {}

  @Get('id/:id')
  async get(
    @Req() req: any,
    @Param() param: ExchangeIdParam,
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

    const result = await this.getExchangeUsecase.call(user, param.id);
    res.status(HttpStatus.OK).json(normalizeResponseData(result));
  }

  @Get()
  async list(
    @Req() req: any,
    @Query() query: ListExchangeQueryDto,
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

    const result = await this.listExchangeUsecase.call(
      user,
      query.search,
      new PaginationParams(
        query.page,
        query.limit,
        query.need_total_count,
        query.only_count,
      ),
      new SortParams(query.sort, query.dir),
      query.from_time,
      query.to_time,
      query.has_finished,
    );
    res.status(HttpStatus.OK).json(normalizeResponseData(result));
  }

  @Post('id/:id/finish')
  async markFinished(
    @Req() req: any,
    @Param() param: ExchangeIdParam,
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

    const exchange = await this.getExchangeUsecase.call(user, param.id);
    if (!exchange) {
      throw new LogicalException(
        ErrorCode.EXCHANGE_NOT_FOUND,
        'Exchange not found.',
        undefined,
      );
    }
    await this.markFinishedExchangeUsecase.call(undefined, exchange);
    res.status(HttpStatus.OK).json(normalizeResponseData(true));
  }

  @Post('create')
  async create(
    @Req() req: any,
    @Body() body: CreateExchangeBodyDto,
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

    await this.createExchangeUsecase.call(
      user,
      body.code,
      body.volume,
      body.price,
      body.type,
    );
    res.status(HttpStatus.OK).json(normalizeResponseData(true));
  }
}
