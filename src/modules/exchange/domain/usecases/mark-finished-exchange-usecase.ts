import { Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/exceptions/error-code';
import { LogicalException } from 'src/exceptions/logical-exception';
import { AddBalanceUsecase } from 'src/modules/user/domain/usecases/admin/add-balance-usecase';
import { GetUserUsecase } from 'src/modules/user/domain/usecases/user/get-user-usecase';
import { ExchangeModel } from '../models/exchange-model';
import { ExchangeRepository } from '../repositories/exchange-repository';

@Injectable()
export class MarkFinishedExchangeUsecase {
  constructor(
    private readonly exchangeRepository: ExchangeRepository,
    private readonly addBalanceUsecase: AddBalanceUsecase,
    private readonly getUserUsecase: GetUserUsecase,
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

      await this.addBalanceUsecase.call(user, exchange.price * exchange.volume);
    }

    await this.exchangeRepository.markFinished(matchedPrice, exchange);
  }
}
