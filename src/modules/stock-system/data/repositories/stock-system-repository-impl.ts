import { Injectable } from '@nestjs/common';
import { VnStockModel } from '../../domain/models/vn-stock-model';
import { StockSystemRepository } from '../../domain/repositories/stock-system-repository';
import { StockSystemService } from '../services/stock-system-service';

@Injectable()
export class StockSystemRepositoryImpl extends StockSystemRepository {
  constructor(private readonly stockSystemService: StockSystemService) {
    super();
  }

  async collectStockInSsiExchange(): Promise<VnStockModel[]> {
    return await this.stockSystemService.collectStockInSsiExchange();
  }
}
