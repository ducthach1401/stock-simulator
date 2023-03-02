import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { ExchangeModel } from '../../domain/models/exchange-model';
import { ExchangeRepository } from '../../domain/repositories/exchange-repository';
import { ExchangeDatasource } from '../database/exchange-datasource';

@Injectable()
export class ExchangeRepositoryImpl extends ExchangeRepository {
  constructor(private readonly exchangeDatasource: ExchangeDatasource) {
    super();
  }

  async get(
    user: UserModel | undefined,
    id: string,
  ): Promise<ExchangeModel | undefined> {
    return await this.exchangeDatasource.get(user, id);
  }

  async create(exchange: ExchangeModel): Promise<void> {
    await this.exchangeDatasource.create(exchange);
  }

  async list(
    user: UserModel | undefined,
    search: string | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    fromTime: Date | undefined,
    toTime: Date | undefined,
    hasFinished: boolean | undefined,
  ): Promise<PageList<ExchangeModel>> {
    return await this.exchangeDatasource.list(
      user,
      search,
      paginationParams,
      sortParams,
      fromTime,
      toTime,
      hasFinished,
    );
  }

  async markFinished(exchange: ExchangeModel): Promise<void> {
    await this.exchangeDatasource.markFinished(exchange);
  }
}
