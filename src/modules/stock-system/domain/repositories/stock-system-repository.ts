import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { StockModel } from '../models/stock-model';
import { VnStockModel } from '../models/vn-stock-model';

export abstract class StockSystemRepository {
  abstract collectStockInSsiExchange(): Promise<VnStockModel[]>;

  abstract create(stock: StockModel): Promise<void>;

  abstract update(stock: StockModel, isExists: boolean): Promise<void>;

  abstract get(id: string): Promise<StockModel | undefined>;

  abstract list(
    user: UserModel | undefined,
    code: string | undefined,
    isExists: boolean | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    fromTime: Date | undefined,
    toTime: Date | undefined,
  ): Promise<PageList<StockModel>>;

  abstract getByTransactionId(
    transactionId: string,
  ): Promise<StockModel | undefined>;

  abstract totalStock(user: UserModel, code: string): Promise<number>;

  abstract delete(stock: StockModel): Promise<void>;
}
