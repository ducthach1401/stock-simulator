import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { normalizeResponseData } from 'src/core/helpers/utils';
import { VnStockModel } from '../models/vn-stock-model';
import { StockSystemRepository } from '../repositories/stock-system-repository';

@Injectable()
export class CollectSystemStockInSsiExchangeUsecase {
  constructor(
    private readonly stockSystemRepository: StockSystemRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async call(): Promise<VnStockModel[]> {
    const stocks = await this.stockSystemRepository.collectStockInSsiExchange();
    await this.cacheManager.set(
      'all_stock',
      stocks.map((stock) => normalizeResponseData(stock)),
    );

    for (const stock of stocks) {
      await this.cacheManager.set(stock.code, normalizeResponseData(stock));
    }
    return stocks;
  }
}
