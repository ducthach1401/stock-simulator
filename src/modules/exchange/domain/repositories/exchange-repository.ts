import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { ExchangeModel } from '../models/exchange-model';

export abstract class ExchangeRepository {
  abstract get(id: string): Promise<ExchangeModel | undefined>;

  abstract list(
    user: UserModel | undefined,
    search: string | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    fromTime: Date | undefined,
    toTime: Date | undefined,
    hasFinished: boolean | undefined,
  ): Promise<PageList<ExchangeModel>>;

  abstract create(exchange: ExchangeModel): Promise<void>;

  abstract markFinished(exchange: ExchangeModel): Promise<void>;
}
