import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { CollectSystemStockInSsiExchangeUsecase } from 'src/modules/stock-system/domain/usecases/collect-system-stock-in-ssi-exchange-usecase';

@Injectable()
export class StockSystemController {
  constructor(
    private readonly collectSystemStockInSsiExchangeUsecase: CollectSystemStockInSsiExchangeUsecase,
  ) {}

  @Interval(5000)
  async collectStock() {
    await this.collectSystemStockInSsiExchangeUsecase.call();
  }
}
