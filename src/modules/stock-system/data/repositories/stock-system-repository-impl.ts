import { Injectable } from '@nestjs/common';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import { StockModel } from '../../domain/models/stock-model';
import { VnStockModel } from '../../domain/models/vn-stock-model';
import { StockSystemRepository } from '../../domain/repositories/stock-system-repository';
import { StockSystemDatasource } from '../database/stock-system-datasource';
import { StockSystemService } from '../services/stock-system-service';

@Injectable()
export class StockSystemRepositoryImpl extends StockSystemRepository {
  constructor(
    private readonly stockSystemService: StockSystemService,
    private readonly stockSystemDatasource: StockSystemDatasource,
  ) {
    super();
  }

  async collectStockInSsiExchange(): Promise<VnStockModel[]> {
    return await this.stockSystemService.collectStockInSsiExchange();
  }

  async get(id: number): Promise<StockModel | undefined> {
    return await this.stockSystemDatasource.get(id);
  }

  async list(
    user: UserModel | undefined,
    code: string | undefined,
    isExists: boolean | undefined,
    paginationParams: PaginationParams,
    sortParams: SortParams,
    fromTime: Date | undefined,
    toTime: Date | undefined,
  ): Promise<PageList<StockModel>> {
    return await this.stockSystemDatasource.list(
      user,
      code,
      isExists,
      paginationParams,
      sortParams,
      fromTime,
      toTime,
    );
  }

  async update(stock: StockModel, isExists: boolean): Promise<void> {
    await this.stockSystemDatasource.update(stock, isExists);
  }

  async create(stock: StockModel): Promise<void> {
    await this.stockSystemDatasource.create(stock);
  }

  async getByTransactionId(
    transactionId: number,
  ): Promise<StockModel | undefined> {
    return await this.stockSystemDatasource.getByTransactionId(transactionId);
  }

  async totalStock(user: UserModel, code: string): Promise<number> {
    return await this.stockSystemDatasource.totalStock(user, code);
  }

  async delete(stock: StockModel): Promise<void> {
    await this.stockSystemDatasource.delete(stock);
  }

  async merge(user: UserModel): Promise<Record<string, any>> {
    return await this.stockSystemDatasource.merge(user);
  }
}
