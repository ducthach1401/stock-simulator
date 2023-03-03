import { Injectable } from '@nestjs/common';
import { StockModel } from '../../models/stock-model';
import { StockSystemRepository } from '../../repositories/stock-system-repository';

@Injectable()
export class GetTransactionStockByTransactionIdUsecase {
  constructor(private readonly stockSystemRepository: StockSystemRepository) {}

  async call(transactionId: string): Promise<StockModel | undefined> {
    return await this.stockSystemRepository.getByTransactionId(transactionId);
  }
}
