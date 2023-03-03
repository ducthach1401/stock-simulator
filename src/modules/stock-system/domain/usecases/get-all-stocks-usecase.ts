import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class GetAllStocksUsecase {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async call(): Promise<Record<string, any>[] | undefined> {
    return await this.cacheManager.get('all_stock');
  }
}
