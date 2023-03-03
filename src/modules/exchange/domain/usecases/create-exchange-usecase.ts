import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { ExchangeType } from '../enums/exchange-type';
import { ExchangeModel } from '../models/exchange-model';
import { ExchangeRepository } from '../repositories/exchange-repository';
import { v4 as uuidv4 } from 'uuid';
import { GetStockUsecase } from 'src/modules/stock-system/domain/usecases/get-stock-usecase';
import { LogicalException } from 'src/exceptions/logical-exception';
import { ErrorCode } from 'src/exceptions/error-code';
import { SubtractBalanceUsecase } from 'src/modules/user/domain/usecases/admin/subtract-balance-usecase';

@Injectable()
export class CreateExchangeUsecase {
  constructor(
    private readonly exchangeRepository: ExchangeRepository,
    private readonly getStockUsecase: GetStockUsecase,
    private readonly subtractBalanceUsecase: SubtractBalanceUsecase,
  ) {}

  async call(
    user: UserModel,
    code: string,
    volume: number,
    price: number,
    type: ExchangeType,
  ): Promise<void> {
    const stock = await this.getStockUsecase.call(code);
    if (!stock) {
      throw new LogicalException(
        ErrorCode.CODE_INVALID,
        'Code invalid.',
        undefined,
      );
    }

    if (type == ExchangeType.Buy) {
      await this.subtractBalanceUsecase.call(user, volume * price);
    }

    const model = new ExchangeModel(
      uuidv4(),
      user.id,
      code,
      volume,
      price,
      type,
      undefined,
      undefined,
      new Date(),
      new Date(),
      undefined,
    );

    await this.exchangeRepository.create(model);
  }
}
