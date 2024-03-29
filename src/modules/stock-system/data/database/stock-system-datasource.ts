import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageList } from 'src/core/models/page-list';
import { PaginationParams } from 'src/core/models/pagination-params';
import { SortParams } from 'src/core/models/sort-params';
import { UserModel } from 'src/modules/user/domain/models/user-model';
import {
  Between,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { StockModel } from '../../domain/models/stock-model';
import { StockEntity } from './entities/stock-entity';

@Injectable()
export class StockSystemDatasource {
  constructor(
    @InjectRepository(StockEntity)
    private readonly stockRepository: Repository<StockEntity>,
  ) {}

  async get(id: number): Promise<StockModel | undefined> {
    return (
      await this.stockRepository.findOne({
        where: {
          id: id,
        },
      })
    )?.toModel();
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
    const conditions: FindOptionsWhere<StockEntity> = {};

    if (user) {
      conditions.user_id = user.id;
    }

    if (code) {
      conditions.code = code;
    }

    if (isExists) {
      conditions.is_exists = isExists;
    }

    if (fromTime && toTime) {
      conditions.created_at = Between(fromTime, toTime);
    } else if (fromTime) {
      conditions.created_at = MoreThanOrEqual(fromTime);
    } else if (toTime) {
      conditions.created_at = LessThanOrEqual(toTime);
    }

    const [stocks, count] = await this.stockRepository.findAndCount({
      where: conditions,
      take: paginationParams.limit,
      skip: paginationParams.limit * (paginationParams.page - 1),
      order: {
        [sortParams.sort]: sortParams.dir,
      },
    });

    return new PageList(
      paginationParams.page,
      count,
      stocks.map((stock) => stock.toModel()),
    );
  }

  async update(stock: StockModel, isExists: boolean): Promise<void> {
    await this.stockRepository.update(
      {
        id: stock.id,
      },
      {
        is_exists: isExists,
        updated_at: new Date(),
      },
    );
  }

  async create(stock: StockModel): Promise<void> {
    const entity = new StockEntity();
    entity.id = stock.id;
    entity.user_id = stock.userId;
    entity.transaction_id = stock.transactionId;
    entity.code = stock.code;
    entity.volume = stock.volume;
    entity.purchase_price = stock.purchasePrice;
    entity.is_exists = stock.isExists;
    entity.created_at = stock.createdAt;
    entity.updated_at = stock.updatedAt;
    await this.stockRepository.save(entity);
  }

  async getByTransactionId(
    transactionId: number,
  ): Promise<StockModel | undefined> {
    return (
      await this.stockRepository.findOne({
        where: {
          transaction_id: transactionId,
        },
      })
    )?.toModel();
  }

  async totalStock(user: UserModel, code: string): Promise<number> {
    const total = await this.stockRepository.query(
      `SELECT SUM(volume) FROM stocks WHERE user_id='${user.id}' AND code='${code}'`,
    );

    return Number(total[0].sum);
  }

  async delete(stock: StockModel): Promise<void> {
    await this.stockRepository.delete({
      id: stock.id,
    });
  }

  async merge(user: UserModel): Promise<Record<string, any>> {
    const avgPrice: any[] = await this.stockRepository.query(
      `SELECT code, ROUND(AVG(purchase_price)) AS purchase_price, MAX(created_at) AS created_at FROM stocks WHERE user_id='${
        user.id
      }' AND is_exists=${true} GROUP BY code;`,
    );

    const sumStocks = await this.stockRepository.query(
      `SELECT code, SUM(volume) AS volume FROM stocks WHERE user_id='${user.id}' GROUP BY code HAVING SUM(volume) > 0;`,
    );

    const mergeStock = sumStocks.map((stock: Record<string, any>) => {
      const price = avgPrice.find((data) => data.code == stock.code);
      stock.purchase_price = Number(price.purchase_price);
      stock.volume = Number(stock.volume);
      stock.total = stock.purchase_price * stock.volume;
      stock.created_at = price.created_at;
      return stock;
    });

    return mergeStock;
  }
}
