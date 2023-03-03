import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class GetStockUsecase {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async call(name: string): Promise<Record<string, any> | undefined> {
    return await this.cacheManager.get(name);
  }
}
