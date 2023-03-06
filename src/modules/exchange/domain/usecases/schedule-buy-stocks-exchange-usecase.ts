import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { GetStockUsecase } from 'src/modules/stock-system/domain/usecases/get-stock-usecase';
import { CreateTransactionStockUsecase } from 'src/modules/stock-system/domain/usecases/transactions/create-transaction-stock-usecase';
import { AddBalanceUsecase } from 'src/modules/user/domain/usecases/admin/add-balance-usecase';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/user/get-user-usecase';
import { ExchangeType } from '../enums/exchange-type';
import { GetExchangesUsecase } from './get-exchanges-usecase';
import { MarkFinishedExchangeUsecase } from './mark-finished-exchange-usecase';

@Injectable()
export class ScheduleBuyStocksExchangeUsecase {
  constructor(
    private readonly getExchangesUsecase: GetExchangesUsecase,
    private readonly getStockUsecase: GetStockUsecase,
    private readonly markFinishedExchangeUsecase: MarkFinishedExchangeUsecase,
    private readonly addBalanceUsecase: AddBalanceUsecase,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly createTransactionStockUsecase: CreateTransactionStockUsecase,
  ) {}

  @Interval(3000)
  async call(): Promise<void> {
    const exchanges = await this.getExchangesUsecase.call(
      ExchangeType.Buy,
      false,
    );

    for (const exchange of exchanges) {
      const stock = await this.getStockUsecase.call(exchange.code);
      if (!stock || stock.purchase_price < 1000) {
        continue;
      }

      const value = exchange.price - stock.purchase_price;
      if (value >= 0) {
        const user = await this.getUserUsecase.call(exchange.userId, undefined);
        if (!user) {
          continue;
        }

        await this.markFinishedExchangeUsecase.call(
          stock.purchase_price,
          exchange,
        );

        await this.createTransactionStockUsecase.call(
          user,
          exchange,
          exchange.code,
          exchange.volume,
          stock.purchase_price,
          true,
        );

        await this.addBalanceUsecase.call(user, value * exchange.volume);
      }
    }
  }
}
