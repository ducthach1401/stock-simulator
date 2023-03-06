import { Injectable } from '@nestjs/common';
import { ExchangeModel } from 'src/modules/exchange/domain/models/exchange-model';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { v4 } from 'uuid';
import { StockModel } from '../../models/stock-model';
import { StockSystemRepository } from '../../repositories/stock-system-repository';

@Injectable()
export class CreateTransactionStockUsecase {
  constructor(private readonly stockSystemRepository: StockSystemRepository) {}

  async call(
    user: UserModel,
    transaction: ExchangeModel,
    code: string,
    volume: number,
    purchasePrice: number | undefined,
    isExists: boolean,
  ): Promise<void> {
    const stock = new StockModel(
      v4(),
      user.id,
      transaction.id,
      code,
      volume,
      purchasePrice,
      isExists,
      new Date(),
      new Date(),
      undefined,
      undefined,
    );

    await this.stockSystemRepository.create(stock);
  }
}
