import { Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { DeleteTransactionStockUsecase } from 'src/modules/stock-system/domain/usecases/transactions/delete-transaction-stock-usecase';
import { GetTransactionStockByTransactionIdUsecase } from 'src/modules/stock-system/domain/usecases/transactions/get-transaction-stock-by-transaction-id-usecase';
import { AddBalanceUsecase } from 'src/modules/user/domain/usecases/admin/add-balance-usecase';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/user/get-user-usecase';
import { ExchangeType } from '../enums/exchange-type';
import { ExchangeModel } from '../models/exchange-model';
import { ExchangeRepository } from '../repositories/exchange-repository';

@Injectable()
export class MarkFinishedExchangeUsecase {
  constructor(
    private readonly exchangeRepository: ExchangeRepository,
    private readonly addBalanceUsecase: AddBalanceUsecase,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly deleteTransactionStockUsecase: DeleteTransactionStockUsecase,
    private readonly getTransactionStockByTransactionIdUsecase: GetTransactionStockByTransactionIdUsecase,
  ) {}

  async call(
    matchedPrice: number | undefined,
    exchange: ExchangeModel,
  ): Promise<void> {
    if (matchedPrice === undefined) {
      const user = await this.getUserUsecase.call(exchange.userId, undefined);
      if (!user) {
        throw new LogicalException(
          ErrorCode.USER_NOT_FOUND,
          'User not found.',
          undefined,
        );
      }

      if (exchange.type == ExchangeType.Buy) {
        await this.addBalanceUsecase.call(
          user,
          exchange.price * exchange.volume,
        );
      } else {
        const stock = await this.getTransactionStockByTransactionIdUsecase.call(
          exchange.id,
        );
        if (!stock) {
          throw new LogicalException(
            ErrorCode.CODE_INVALID,
            'Code invalid.',
            undefined,
          );
        }
        await this.deleteTransactionStockUsecase.call(stock);
      }
    }

    await this.exchangeRepository.markFinished(matchedPrice, exchange);
  }
}
