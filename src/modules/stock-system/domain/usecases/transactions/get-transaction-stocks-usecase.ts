import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { StockModel } from '../../models/stock-model';
import { StockSystemRepository } from '../../repositories/stock-system-repository';

@Injectable()
export class GetTransactionStocksUsecase {
  constructor(private readonly stockSystemRepository: StockSystemRepository) {}

  async call(
    user: UserModel | undefined,
    code: string | undefined,
    isExists: boolean | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    fromTime: Date | undefined,
    toTime: Date | undefined,
  ): Promise<PageList<StockModel>> {
    return await this.stockSystemRepository.list(
      user,
      code,
      isExists,
      paginationParams,
      sortParams,
      fromTime,
      toTime,
    );
  }
}
