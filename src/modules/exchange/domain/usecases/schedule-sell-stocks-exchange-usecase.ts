import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { GetStockUsecase } from 'src/modules/stock-system/domain/usecases/get-stock-usecase';
import { GetTransactionStockByTransactionIdUsecase } from 'src/modules/stock-system/domain/usecases/transactions/get-transaction-stock-by-transaction-id-usecase';
import { UpdateTransactionStockUsecase } from 'src/modules/stock-system/domain/usecases/transactions/update-transaction-stock-usecase';
import { AddBalanceUsecase } from 'src/modules/user/domain/usecases/admin/add-balance-usecase';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/user/get-user-usecase';
import { ExchangeType } from '../enums/exchange-type';
import { GetExchangesUsecase } from './get-exchanges-usecase';
import { MarkFinishedExchangeUsecase } from './mark-finished-exchange-usecase';

@Injectable()
export class ScheduleSellStocksExchangeUsecase {
  constructor(
    private readonly getExchangesUsecase: GetExchangesUsecase,
    private readonly getStockUsecase: GetStockUsecase,
    private readonly markFinishedExchangeUsecase: MarkFinishedExchangeUsecase,
    private readonly addBalanceUsecase: AddBalanceUsecase,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly getTransactionStockByTransactionIdUsecase: GetTransactionStockByTransactionIdUsecase,
    private readonly updateTransactionStockUsecase: UpdateTransactionStockUsecase,
  ) {}

  @Interval(3000)
  async call(): Promise<void> {
    const exchanges = await this.getExchangesUsecase.call(
      ExchangeType.Sell,
      false,
    );

    for (const exchange of exchanges) {
      const stock = await this.getStockUsecase.call(exchange.code);
      if (!stock || stock.sale_price < 1000) {
        continue;
      }

      const value = stock.sale_price - exchange.price;
      if (value >= 0) {
        const user = await this.getUserUsecase.call(exchange.userId, undefined);
        if (!user) {
          continue;
        }

        const purchaseStock =
          await this.getTransactionStockByTransactionIdUsecase.call(
            exchange.id,
          );

        if (!purchaseStock) {
          continue;
        }

        await this.markFinishedExchangeUsecase.call(stock.sale_price, exchange);

        await this.updateTransactionStockUsecase.call(purchaseStock, false);

        await this.addBalanceUsecase.call(
          user,
          stock.sale_price * exchange.volume,
        );
      }
    }
  }
}
