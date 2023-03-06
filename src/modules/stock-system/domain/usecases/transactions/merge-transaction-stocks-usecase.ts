import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { StockSystemRepository } from '../../repositories/stock-system-repository';

@Injectable()
export class MergeTransactionStocksUsecase {
  constructor(private readonly stockSystemRepository: StockSystemRepository) {}

  async call(user: UserModel): Promise<Record<string, any>> {
    return await this.stockSystemRepository.merge(user);
  }
}
