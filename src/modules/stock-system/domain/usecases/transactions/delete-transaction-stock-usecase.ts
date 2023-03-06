import { Injectable } from '@nestjs/common';
import { StockModel } from '../../models/stock-model';
import { StockSystemRepository } from '../../repositories/stock-system-repository';

@Injectable()
export class DeleteTransactionStockUsecase {
  constructor(private readonly stockSystemRepository: StockSystemRepository) {}

  async call(stock: StockModel): Promise<void> {
    await this.stockSystemRepository.delete(stock);
  }
}
