import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { ExchangeModel } from '../models/exchange-model';
import { ExchangeRepository } from '../repositories/exchange-repository';

@Injectable()
export class ListExchangeUsecase {
  constructor(private readonly exchangeRepository: ExchangeRepository) {}

  async call(
    user: UserModel | undefined,
    search: string | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    fromTime: Date | undefined,
    toTime: Date | undefined,
    hasFinished: boolean | undefined,
  ): Promise<PageList<ExchangeModel>> {
    return await this.exchangeRepository.list(
      user,
      search,
      paginationParams,
      sortParams,
      fromTime,
      toTime,
      hasFinished,
    );
  }
}
