import { Injectable } from '@nestjs/common';
import { StockModel } from '../../models/stock-model';
import { StockSystemRepository } from '../../repositories/stock-system-repository';

@Injectable()
export class UpdateTransactionStockUsecase {
  constructor(private readonly stockSystemRepository: StockSystemRepository) {}

  async call(stock: StockModel, isExists: boolean): Promise<void> {
    await this.stockSystemRepository.update(stock, isExists);
  }
}
