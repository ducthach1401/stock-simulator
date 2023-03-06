import { Injectable } from '@nestjs/common';
import { StockModel } from '../../models/stock-model';
import { StockSystemRepository } from '../../repositories/stock-system-repository';

@Injectable()
export class GetTransactionStockUsecase {
  constructor(private readonly stockSystemRepository: StockSystemRepository) {}

  async call(id: string): Promise<StockModel | undefined> {
    return await this.stockSystemRepository.get(id);
  }
}
